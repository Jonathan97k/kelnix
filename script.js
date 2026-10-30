document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile navigation toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3. Visitor Intelligence & Analytics Session
    initVisitorAnalytics();

    // 4. Kelnix AI Chat Assistant Widget
    initAIChatWidget();
});

function initVisitorAnalytics() {
    try {
        let sessionId = localStorage.getItem('kelnix_session_id');
        if (!sessionId) {
            sessionId = 'klx_ses_' + Math.random().toString(36.substring(2, 15)) + Date.now().toString(36);
            localStorage.setItem('kelnix_session_id', sessionId);
        }

        const visitData = {
            sessionId: sessionId,
            landingPage: window.location.pathname,
            referrer: document.referrer || 'Direct',
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
        };

        // Simulated privacy-conscious IP location check
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                visitData.country = data.country_name || 'Unknown';
                visitData.region = data.region || 'Unknown';
                visitData.city = data.city || 'Unknown';
                console.log('[Kelnix Analytics] Session recorded:', visitData);
            })
            .catch(() => {
                visitData.country = 'Malawi';
                visitData.city = 'Lilongwe / Blantyre';
                console.log('[Kelnix Analytics] Session recorded (Fallback):', visitData);
            });
    } catch (err) {
        console.error('[Kelnix Analytics error]', err);
    }
}

function initAIChatWidget() {
    // Inject floating AI chat widget into DOM
    const chatContainer = document.createElement('div');
    chatContainer.id = 'kelnixAIWidget';
    chatContainer.innerHTML = `
        <button id="aiChatToggle" aria-label="Open Kelnix AI Assistant">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <span>Kelnix AI</span>
        </button>
        <div id="aiChatWindow" class="hidden glass-panel">
            <div class="ai-chat-header">
                <div class="ai-title">
                    <span class="status-dot"></span>
                    <strong>Kelnix AI Assistant</strong>
                </div>
                <button id="aiChatClose" aria-label="Close Chat">&times;</button>
            </div>
            <div id="aiChatMessages" class="ai-chat-messages">
                <div class="ai-msg bot">
                    Hello! I'm the Kelnix AI Assistant. How can I help you today with business automation, web development, AI integration, or data solutions?
                </div>
            </div>
            <div class="ai-chat-suggestions">
                <button class="suggestion-btn" data-query="What services does Kelnix offer?">Services</button>
                <button class="suggestion-btn" data-query="How do I request an automation quote?">Request Quote</button>
                <button class="suggestion-btn" data-query="What is your WhatsApp number?">WhatsApp</button>
            </div>
            <div class="ai-chat-input-area">
                <input type="text" id="aiChatInput" placeholder="Ask about Kelnix services...">
                <button id="aiChatSend">Send</button>
            </div>
        </div>
    `;
    document.body.appendChild(chatContainer);

    // Style the chat widget via JS / CSS injection
    const style = document.createElement('style');
    style.innerHTML = `
        #kelnixAIWidget {
            position: fixed;
            bottom: 25px;
            right: 25px;
            z-index: 9999;
            font-family: var(--font-sans);
        }
        #aiChatToggle {
            background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
            color: white;
            border: none;
            padding: 0.75rem 1.25rem;
            border-radius: 50px;
            cursor: pointer;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow: 0 10px 30px rgba(6, 182, 212, 0.4);
            transition: var(--transition);
        }
        #aiChatToggle:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(6, 182, 212, 0.6);
        }
        #aiChatWindow {
            position: absolute;
            bottom: 65px;
            right: 0;
            width: 360px;
            height: 500px;
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 25px 60px rgba(0,0,0,0.7);
            border: 1px solid var(--border-color);
            background: rgba(10, 15, 29, 0.95);
        }
        #aiChatWindow.hidden {
            display: none;
        }
        .ai-chat-header {
            padding: 1rem 1.25rem;
            background: var(--bg-secondary);
            border-bottom: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .ai-title {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.95rem;
        }
        .status-dot {
            width: 8px;
            height: 8px;
            background: #10b981;
            border-radius: 50%;
            box-shadow: 0 0 8px #10b981;
        }
        #aiChatClose {
            background: none;
            border: none;
            color: var(--text-muted);
            font-size: 1.5rem;
            cursor: pointer;
        }
        .ai-chat-messages {
            flex: 1;
            padding: 1rem;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            font-size: 0.9rem;
        }
        .ai-msg {
            padding: 0.75rem 1rem;
            border-radius: 12px;
            max-width: 85%;
            line-height: 1.5;
        }
        .ai-msg.bot {
            background: var(--bg-secondary);
            color: var(--text-main);
            align-self: flex-start;
            border: 1px solid var(--border-color);
        }
        .ai-msg.user {
            background: var(--accent-primary);
            color: var(--bg-primary);
            align-self: flex-end;
            font-weight: 500;
        }
        .ai-chat-suggestions {
            padding: 0.5rem 1rem;
            display: flex;
            gap: 0.5rem;
            overflow-x: auto;
            border-top: 1px solid var(--border-color);
            background: rgba(13, 20, 36, 0.5);
        }
        .suggestion-btn {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            color: var(--text-muted);
            padding: 0.3rem 0.6rem;
            border-radius: 6px;
            font-size: 0.75rem;
            cursor: pointer;
            white-space: nowrap;
            transition: var(--transition);
        }
        .suggestion-btn:hover {
            color: var(--accent-primary);
            border-color: var(--accent-primary);
        }
        .ai-chat-input-area {
            padding: 0.75rem 1rem;
            display: flex;
            gap: 0.5rem;
            border-top: 1px solid var(--border-color);
            background: var(--bg-secondary);
        }
        #aiChatInput {
            flex: 1;
            background: var(--bg-primary);
            border: 1px solid var(--border-color);
            padding: 0.6rem 0.75rem;
            border-radius: 8px;
            color: var(--text-main);
            font-size: 0.9rem;
        }
        #aiChatInput:focus {
            outline: none;
            border-color: var(--accent-primary);
        }
        #aiChatSend {
            background: var(--accent-primary);
            color: var(--bg-primary);
            border: none;
            padding: 0.6rem 1rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    // Chat interactions
    const toggleBtn = document.getElementById('aiChatToggle');
    const closeBtn = document.getElementById('aiChatClose');
    const chatWindow = document.getElementById('aiChatWindow');
    const sendBtn = document.getElementById('aiChatSend');
    const inputField = document.getElementById('aiChatInput');
    const messagesArea = document.getElementById('aiChatMessages');

    toggleBtn.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
    });

    function handleUserMessage(text) {
        if (!text.trim()) return;

        // Append user message
        const userDiv = document.createElement('div');
        userDiv.className = 'ai-msg user';
        userDiv.textContent = text;
        messagesArea.appendChild(userDiv);
        inputField.value = '';
        messagesArea.scrollTop = messagesArea.scrollHeight;

        // RAG / Knowledge Base matching
        setTimeout(() => {
            const botDiv = document.createElement('div');
            botDiv.className = 'ai-msg bot';
            botDiv.textContent = generateKelnixAIResponse(text);
            messagesArea.appendChild(botDiv);
            messagesArea.scrollTop = messagesArea.scrollHeight;
        }, 600);
    }

    sendBtn.addEventListener('click', () => {
        handleUserMessage(inputField.value);
    });

    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage(inputField.value);
        }
    });

    document.querySelectorAll('.suggestion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            handleUserMessage(btn.getAttribute('data-query'));
        });
    });
}

function generateKelnixAIResponse(query) {
    const q = query.toLowerCase();
    if (q.includes('service') || q.includes('offer') || q.includes('what do you do')) {
        return "Kelnix offers six core divisions: 1. Business Automation & AI, 2. Website Development, 3. Application & Software Development, 4. Lead Generation & Business Intelligence, 5. Data Analytics & Solutions, and 6. Content Clipping & Video Repurposing.";
    } else if (q.includes('whatsapp') || q.includes('contact') || q.includes('phone') || q.includes('human')) {
        return "You can instantly connect with Kelnix via WhatsApp at +265 882 986 170 (https://wa.me/265882986170) or submit a project enquiry through our Request Quote page.";
    } else if (q.includes('quote') || q.includes('price') || q.includes('cost') || q.includes('enquiry')) {
        return "To get an accurate quote for your project, please visit our Request Quote page where you can specify your project scope, budget (MWK or USD), and timeline.";
    } else if (q.includes('location') || q.includes('malawi') || q.includes('where')) {
        return "Kelnix is based in Malawi and serves both regional businesses and international clients with high-performance digital systems.";
    } else {
        return "Thank you for your question. Kelnix provides tailored digital solutions and automation. For detailed project discussions, please reach us on WhatsApp at +265 882 986 170 or submit an enquiry on our Request Quote page.";
    }
}
