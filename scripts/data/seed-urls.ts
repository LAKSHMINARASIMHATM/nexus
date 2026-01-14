/**
 * Seed URLs for the crawler to start indexing
 * Priority: 1 (lowest) to 10 (highest)
 * Depth: Starting depth for crawling (0 = seed URL)
 */

export const seedUrls = [
    // High-priority tech documentation
    { url: 'https://developer.mozilla.org/en-US/', priority: 10, depth: 0 },
    { url: 'https://nodejs.org/docs/latest/api/', priority: 10, depth: 0 },
    { url: 'https://react.dev/', priority: 10, depth: 0 },
    { url: 'https://nextjs.org/docs', priority: 10, depth: 0 },
    { url: 'https://www.typescriptlang.org/docs/', priority: 10, depth: 0 },

    // Tech blogs and news
    { url: 'https://techcrunch.com/', priority: 8, depth: 0 },
    { url: 'https://www.theverge.com/', priority: 8, depth: 0 },
    { url: 'https://arstechnica.com/', priority: 8, depth: 0 },
    { url: 'https://news.ycombinator.com/', priority: 9, depth: 0 },
    { url: 'https://dev.to/', priority: 8, depth: 0 },

    // Developer resources
    { url: 'https://stackoverflow.com/', priority: 9, depth: 0 },
    { url: 'https://github.com/topics', priority: 8, depth: 0 },
    { url: 'https://www.freecodecamp.org/', priority: 7, depth: 0 },
    { url: 'https://css-tricks.com/', priority: 7, depth: 0 },
    { url: 'https://web.dev/', priority: 9, depth: 0 },

    // Cloud platforms documentation
    { url: 'https://docs.aws.amazon.com/', priority: 9, depth: 0 },
    { url: 'https://cloud.google.com/docs', priority: 9, depth: 0 },
    { url: 'https://learn.microsoft.com/en-us/azure/', priority: 9, depth: 0 },

    // Programming languages
    { url: 'https://docs.python.org/3/', priority: 9, depth: 0 },
    { url: 'https://go.dev/doc/', priority: 8, depth: 0 },
    { url: 'https://www.rust-lang.org/learn', priority: 8, depth: 0 },
    { url: 'https://docs.oracle.com/en/java/', priority: 8, depth: 0 },

    // Frameworks and libraries
    { url: 'https://vuejs.org/guide/introduction.html', priority: 8, depth: 0 },
    { url: 'https://angular.io/docs', priority: 8, depth: 0 },
    { url: 'https://svelte.dev/docs', priority: 7, depth: 0 },
    { url: 'https://expressjs.com/', priority: 7, depth: 0 },
    { url: 'https://nestjs.com/', priority: 7, depth: 0 },
    { url: 'https://fastapi.tiangolo.com/', priority: 7, depth: 0 },
    { url: 'https://flask.palletsprojects.com/', priority: 7, depth: 0 },
    { url: 'https://www.djangoproject.com/', priority: 8, depth: 0 },

    // Databases
    { url: 'https://www.postgresql.org/docs/', priority: 8, depth: 0 },
    { url: 'https://www.mongodb.com/docs/', priority: 8, depth: 0 },
    { url: 'https://redis.io/docs/', priority: 8, depth: 0 },
    { url: 'https://www.elastic.co/guide/', priority: 9, depth: 0 },

    // DevOps and tools
    { url: 'https://kubernetes.io/docs/', priority: 9, depth: 0 },
    { url: 'https://docs.docker.com/', priority: 9, depth: 0 },
    { url: 'https://www.terraform.io/docs', priority: 8, depth: 0 },
    { url: 'https://docs.gitlab.com/', priority: 7, depth: 0 },

    // AI/ML resources
    { url: 'https://pytorch.org/docs/', priority: 8, depth: 0 },
    { url: 'https://www.tensorflow.org/learn', priority: 8, depth: 0 },
    { url: 'https://huggingface.co/docs', priority: 8, depth: 0 },
    { url: 'https://scikit-learn.org/stable/', priority: 7, depth: 0 },

    // General knowledge
    { url: 'https://en.wikipedia.org/wiki/Main_Page', priority: 7, depth: 0 },
    { url: 'https://www.britannica.com/', priority: 6, depth: 0 },

    // Medium priority - blogs
    { url: 'https://martinfowler.com/', priority: 6, depth: 0 },
    { url: 'https://blog.cloudflare.com/', priority: 6, depth: 0 },
    { url: 'https://engineering.fb.com/', priority: 7, depth: 0 },
    { url: 'https://netflixtechblog.com/', priority: 7, depth: 0 },
    { url: 'https://github.blog/engineering/', priority: 7, depth: 0 },

    // Lower priority - general tech sites
    { url: 'https://www.wired.com/tag/tech/', priority: 5, depth: 0 },
    { url: 'https://www.cnet.com/', priority: 5, depth: 0 },
    { url: 'https://www.zdnet.com/', priority: 5, depth: 0 },
];
