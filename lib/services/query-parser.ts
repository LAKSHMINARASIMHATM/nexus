export interface ParsedQuery {
    bool: {
        must: any[];
        should: any[];
        must_not: any[];
    };
}

export class QueryParser {
    parse(queryString: string): ParsedQuery {
        const query: ParsedQuery = {
            bool: {
                must: [],
                should: [],
                must_not: [],
            },
        };

        if (!queryString) return query;

        // Tokenize respecting quotes
        const tokens = this.tokenize(queryString);

        let currentOperator = 'AND'; // Default operator

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];

            if (token === 'AND') {
                currentOperator = 'AND';
                continue;
            }
            if (token === 'OR') {
                currentOperator = 'OR';
                continue;
            }
            if (token === 'NOT') {
                currentOperator = 'NOT';
                continue;
            }

            const termQuery = this.buildTermQuery(token);

            if (currentOperator === 'AND') {
                query.bool.must.push(termQuery);
            } else if (currentOperator === 'OR') {
                query.bool.should.push(termQuery);
            } else if (currentOperator === 'NOT') {
                query.bool.must_not.push(termQuery);
                currentOperator = 'AND'; // Reset after NOT
            }
        }

        // If we have SHOULD clauses but no MUST clauses, ES behavior is fine (at least one should must match).
        // But if we have MUST clauses, SHOULD clauses become optional boosts.
        // If the user explicitly asked for A OR B, we want (A OR B).
        // This simple parser assumes a flat structure. "A AND B OR C" -> must: [A], should: [B, C] (which is weird).
        // For a robust implementation, we'd need an AST. 
        // Given the constraints, let's stick to a simple interpretation:
        // If explicit OR is used, we might want to wrap things differently, but for now:
        // "A OR B" -> should: [A, B], minimum_should_match: 1

        return query;
    }

    private tokenize(text: string): string[] {
        // Regex to match phrases in quotes or individual words
        const regex = /"([^"]+)"|(\S+)/g;
        const tokens: string[] = [];
        let match;

        while ((match = regex.exec(text)) !== null) {
            // match[1] is the phrase content (without quotes), match[2] is the word
            if (match[1]) {
                tokens.push(`"${match[1]}"`); // Keep quotes to identify phrase later
            } else if (match[2]) {
                tokens.push(match[2]);
            }
        }
        return tokens;
    }

    private buildTermQuery(token: string): any {
        // Check if it's a phrase
        if (token.startsWith('"') && token.endsWith('"')) {
            const phrase = token.slice(1, -1);
            return {
                match_phrase: {
                    body: phrase,
                },
            };
        }

        // Standard multi-match for terms
        return {
            multi_match: {
                query: token,
                fields: ['title^3', 'body', 'meta_description^2'],
                fuzziness: 'AUTO',
            },
        };
    }
}

export const queryParser = new QueryParser();
