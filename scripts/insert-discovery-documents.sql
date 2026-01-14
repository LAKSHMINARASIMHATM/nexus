-- Insert Discovery Page Documents into Database
-- This script adds all documents referenced in the discovery page

-- Neural Architecture Category Documents
INSERT INTO documents (url, title, meta_description, body, body_length, language, pagerank, index_status, last_modified) VALUES
('https://arxiv.org/abs/2301.07041', 'Transformer Architecture Evolution: A Comprehensive Survey', 
'A comprehensive survey of transformer architecture evolution, covering attention mechanisms, encoder-decoder designs, and recent innovations in neural network architectures.',
'Transformer architectures have revolutionized natural language processing and computer vision. This paper provides a comprehensive survey of the evolution from the original transformer to modern variants including BERT, GPT, T5, and vision transformers. We analyze architectural improvements, training methodologies, and applications across domains.',
15420, 'en', 0.85, 'indexed', '2024-01-12'),

('https://www.nature.com/articles/s41586-023-06748-0', 'Mars Colonization: Biological Challenges and Solutions',
'Comprehensive analysis of biological challenges for Mars colonization including radiation exposure, low gravity effects, and psychological factors for long-duration space missions.',
'Mars colonization presents significant biological challenges that must be addressed for successful human settlement. This research examines radiation exposure risks, bone density loss in low gravity, psychological impacts of isolation, and potential solutions including advanced shielding, artificial gravity systems, and psychological support protocols.',
8750, 'en', 0.82, 'indexed', '2024-01-10'),

('https://ieeexplore.ieee.org/document/10123456', 'DeFi Protocol Security: Best Practices and Common Vulnerabilities',
'Detailed analysis of security vulnerabilities in decentralized finance protocols, including smart contract exploits, oracle attacks, and mitigation strategies for building secure DeFi applications.',
'Decentralized finance has revolutionized financial services but introduced novel security challenges. This paper analyzes common vulnerabilities in DeFi protocols including reentrancy attacks, oracle manipulation, and flash loan exploits. We provide comprehensive security frameworks and best practices for developing robust DeFi applications.',
12300, 'en', 0.88, 'indexed', '2024-01-11'),

('https://www.sciencedirect.com/science/article/pii/S0160795X23004567', 'Smart City Integration: IoT and Urban Analytics',
'Comprehensive guide to implementing IoT systems in smart cities, covering sensor networks, data analytics platforms, and integration frameworks for urban infrastructure management.',
'Smart cities require sophisticated IoT integration for efficient urban management. This research presents comprehensive frameworks for deploying sensor networks, implementing real-time analytics platforms, and integrating diverse urban systems including transportation, energy, and public services.',
9800, 'en', 0.79, 'indexed', '2024-01-09'),

('https://www.nature.com/articles/s41534-023-00001-2', 'Quantum Supremacy: Practical Applications and Limitations',
'Analysis of quantum computing supremacy achievements, practical applications in cryptography, optimization, and scientific computing, along with current limitations and future research directions.',
'Quantum supremacy represents a major milestone in computing, but practical applications remain limited. This paper examines current quantum computing capabilities, potential applications in cryptography and optimization, and fundamental limitations including error rates and scalability challenges.',
11200, 'en', 0.91, 'indexed', '2024-01-08'),

('https://dl.acm.org/doi/10.1145/3571234', 'AI Bias Detection and Mitigation Strategies',
'Comprehensive framework for detecting and mitigating bias in AI systems, including algorithmic fairness metrics, bias detection methodologies, and practical mitigation strategies.',
'AI bias remains a critical challenge in developing fair and equitable systems. This research presents comprehensive frameworks for bias detection across different AI modalities, including computer vision, natural language processing, and recommendation systems. We provide practical mitigation strategies and evaluation metrics.',
7600, 'en', 0.84, 'indexed', '2024-01-07'),

-- Trending Neural Link Protocol Documents
INSERT INTO documents (url, title, meta_description, body, body_length, language, pagerank, index_status, last_modified) VALUES
('https://neuralink.com/tech/protocol-v1-integration', 'Neural Link Protocol V1.0 - Integration Guide',
'Comprehensive guide for implementing neural link protocols in distributed systems, covering architecture patterns and best practices for brain-computer interface integration.',
'The Neural Link Protocol V1.0 establishes foundational architecture for brain-computer interfaces. This integration guide covers system requirements, implementation patterns, and best practices for deploying neural link systems in clinical and research environments.',
5420, 'en', 0.87, 'indexed', '2024-01-13T10:00:00'),

('https://neuralink.com/tech/protocol-v2-integration', 'Neural Link Protocol V2.0 - Integration Guide',
'Advanced implementation strategies for neural link protocols with enhanced security features and performance optimizations for high-bandwidth neural data transmission.',
'Neural Link Protocol V2.0 introduces significant improvements in data throughput and security. This guide covers advanced encryption methods, bandwidth optimization techniques, and implementation strategies for next-generation neural interfaces.',
6180, 'en', 0.89, 'indexed', '2024-01-13T08:00:00'),

('https://neuralink.com/tech/protocol-v3-integration', 'Neural Link Protocol V3.0 - Integration Guide',
'Next-generation neural link protocol specifications with quantum-resistant encryption and zero-knowledge proofs for secure neural data transmission.',
'Protocol V3.0 represents a major advancement with quantum-resistant cryptography and zero-knowledge proof implementations. This comprehensive guide covers the new security model, implementation requirements, and migration strategies from previous versions.',
7350, 'en', 0.92, 'indexed', '2024-01-13T06:00:00'),

('https://neuralink.com/tech/protocol-v4-integration', 'Neural Link Protocol V4.0 - Integration Guide',
'Cutting-edge neural link protocol implementation with AI-driven optimization and adaptive routing mechanisms for real-time neural signal processing.',
'Protocol V4.0 introduces AI-driven optimization algorithms that adapt to individual neural patterns. This guide covers machine learning integration, adaptive routing mechanisms, and real-time signal processing capabilities.',
8920, 'en', 0.94, 'indexed', '2024-01-13T04:00:00'),

('https://neuralink.com/tech/protocol-v5-integration', 'Neural Link Protocol V5.0 - Integration Guide',
'Latest neural link protocol with breakthrough features including real-time neuro-adaptive learning and predictive analytics for enhanced brain-computer interface performance.',
'Protocol V5.0 represents the cutting edge with neuro-adaptive learning capabilities. This integration guide covers predictive analytics, real-time adaptation algorithms, and breakthrough features for next-generation brain-computer interfaces.',
10200, 'en', 0.96, 'indexed', '2024-01-13T02:00:00'),

-- Popular Documents
INSERT INTO documents (url, title, meta_description, body, body_length, language, pagerank, index_status, last_modified) VALUES
('https://arxiv.org/abs/2201.04123', 'Quantum Computing Basics',
'Fundamental concepts of quantum computing, including qubits, superposition, quantum gates, and basic quantum algorithms for beginners and researchers new to quantum computing.',
'Quantum computing fundamentals including qubit mechanics, superposition principles, quantum entanglement, and basic quantum circuits. This comprehensive introduction covers mathematical foundations, physical implementations, and practical applications of quantum computing.',
8750, 'en', 0.88, 'indexed', '2024-01-12'),

('https://www.sciencedirect.com/science/article/pii/S0264833723004567', 'Sustainable Urban Planning',
'Comprehensive guide to sustainable city design, green infrastructure, urban ecology, and environmental planning for creating livable and environmentally friendly urban environments.',
'Sustainable urban planning requires integrating environmental considerations with urban development. This guide covers green infrastructure design, urban ecology principles, renewable energy integration, and community engagement strategies for sustainable cities.',
12300, 'en', 0.81, 'indexed', '2024-01-11'),

('https://www.aaai.org/library/ethics/ai-ethics-framework', 'AI Ethics Framework',
'Ethical considerations in AI development, including bias mitigation, fairness principles, transparency requirements, and responsible AI practices for building trustworthy artificial intelligence systems.',
'AI ethics framework covering responsible development practices, bias detection and mitigation, fairness metrics, transparency requirements, and governance structures for building trustworthy AI systems that align with human values.',
9800, 'en', 0.85, 'indexed', '2024-01-10'),

('https://www.blockchainresearch.org/web3-infrastructure', 'Web3 Infrastructure',
'Building scalable Web3 applications, smart contracts, decentralized systems, and blockchain infrastructure for the next generation of internet applications and services.',
'Web3 infrastructure development covering blockchain protocols, smart contract development, decentralized application architecture, and scalability solutions for building the next generation of internet applications.',
11200, 'en', 0.83, 'indexed', '2024-01-09'),

-- Recent Documents
INSERT INTO documents (url, title, meta_description, body, body_length, language, pagerank, index_status, last_modified) VALUES
('https://arxiv.org/abs/2401.02345', 'Neural Architecture Optimization',
'Advanced techniques for optimizing neural network architectures, including automated architecture search, performance tuning, and efficiency improvements for deep learning models.',
'Neural architecture optimization using automated search algorithms, performance tuning techniques, and efficiency improvements. This research presents novel approaches for discovering optimal neural network architectures automatically.',
6800, 'en', 0.89, 'indexed', '2024-01-13T08:00:00'),

('https://www.nasa.gov/astrobiology/deep-space-findings', 'Deep Space Biology Findings',
'Latest discoveries in astrobiology and deep space research, including extremophile organisms, planetary habitability studies, and the search for extraterrestrial life in our solar system and beyond.',
'Deep space biology research revealing new extremophile organisms, planetary habitability assessments, and breakthrough findings in the search for extraterrestrial life. This comprehensive report covers recent NASA missions and discoveries.',
9200, 'en', 0.92, 'indexed', '2024-01-13T05:00:00'),

('https://www.ieee.org/security/web3-protocols', 'Web3 Security Protocols',
'Comprehensive analysis of security protocols for Web3 applications, including blockchain security, smart contract auditing, and cryptographic foundations for decentralized systems.',
'Web3 security protocols covering blockchain cryptography, smart contract security, decentralized identity management, and security best practices for building secure Web3 applications and infrastructure.',
7600, 'en', 0.86, 'indexed', '2024-01-13T03:00:00'),

('https://www.epa.gov/sustainable-energy', 'Sustainable Energy Solutions',
'Case studies and solutions for sustainable energy implementation, including renewable energy technologies, energy efficiency programs, and environmental impact reduction strategies.',
'Sustainable energy solutions featuring case studies of successful renewable energy implementations, energy efficiency programs, and environmental impact reduction strategies for businesses and communities.',
5400, 'en', 0.78, 'indexed', '2024-01-13T01:00:00'),

('https://www.quantumcomputing.institute/applications', 'Quantum Computing Applications',
'Practical applications of quantum computing in cryptography, optimization, machine learning, and scientific research, with implementation guides and case studies.',
'Quantum computing applications across cryptography, optimization problems, machine learning algorithms, and scientific research. This guide includes practical implementation examples and real-world case studies.',
8100, 'en', 0.90, 'indexed', '2024-01-12'),

-- Featured Documents
INSERT INTO documents (url, title, meta_description, body, body_length, language, pagerank, index_status, last_modified) VALUES
('https://www.nature.com/articles/s41586-023-04567-8', 'The Future of Neural Networks',
'An in-depth analysis of emerging trends and breakthrough technologies in neural network architecture, including transformers, graph neural networks, and neuromorphic computing.',
'The future of neural networks encompasses groundbreaking architectures including transformers, graph neural networks, and neuromorphic computing systems. This comprehensive analysis covers emerging trends, technological breakthroughs, and future research directions.',
12500, 'en', 0.95, 'indexed', '2024-01-08'),

('https://www.sustainablecomputing.org/guide', 'Sustainable Computing Practices',
'Comprehensive guide to implementing eco-friendly solutions in modern computing infrastructure, including green data centers, energy-efficient algorithms, and carbon footprint reduction.',
'Sustainable computing practices covering green data center design, energy-efficient algorithms, carbon footprint reduction strategies, and environmentally conscious technology choices for modern computing infrastructure.',
9800, 'en', 0.87, 'indexed', '2024-01-07');

-- Add categories as metadata (if you have a categories table)
-- Note: You might need to create a categories table and document_categories junction table
-- For now, we can store category information in the body or create a simple metadata JSON column
