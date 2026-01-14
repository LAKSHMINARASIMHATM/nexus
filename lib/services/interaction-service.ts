import pool from '../db';

export interface SearchEvent {
    user_id?: string;
    session_id: string;
    query: string;
    result_count: number;
    execution_time_ms: number;
}

export interface ClickEvent {
    search_event_id: string;
    doc_id: string;
    position: number;
    user_id?: string;
    session_id: string;
}

export class InteractionService {
    async logSearchEvent(event: SearchEvent): Promise<string> {
        const sql = `
            INSERT INTO search_events (
                user_id, 
                session_id, 
                query_text, 
                result_count, 
                execution_time_ms
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING event_id
        `;

        try {
            const result = await pool.query(sql, [
                event.user_id || null,
                event.session_id,
                event.query,
                event.result_count,
                event.execution_time_ms
            ]);
            return result.rows[0].event_id;
        } catch (error) {
            console.error('Failed to log search event:', error);
            return ''; // Fail gracefully
        }
    }

    async logClickEvent(event: ClickEvent): Promise<string> {
        const sql = `
            INSERT INTO click_events (
                search_event_id,
                doc_id,
                position
            )
            VALUES ($1, $2, $3)
            RETURNING click_id
        `;

        try {
            // Verify search_event_id exists to maintain referential integrity
            // In a real high-volume system, we might skip this check or use a queue
            if (event.search_event_id) {
                const result = await pool.query(sql, [
                    event.search_event_id,
                    event.doc_id,
                    event.position
                ]);
                return result.rows[0].click_id;
            } else {
                console.warn('Click event missing search_event_id, skipping insert');
                return '';
            }
        } catch (error) {
            console.error('Failed to log click event:', error);
            return '';
        }
    }

    async getUserHistory(userId: string, limit: number = 10) {
        const sql = `
            SELECT 
                se.query_text, 
                se.timestamp, 
                count(ce.click_id) as clicks
            FROM search_events se
            LEFT JOIN click_events ce ON se.event_id = ce.search_event_id
            WHERE se.user_id = $1
            GROUP BY se.event_id, se.query_text, se.timestamp
            ORDER BY se.timestamp DESC
            LIMIT $2
        `;

        try {
            const result = await pool.query(sql, [userId, limit]);
            return result.rows;
        } catch (error) {
            console.error('Failed to get user history:', error);
            return [];
        }
    }
}

export const interactionService = new InteractionService();
