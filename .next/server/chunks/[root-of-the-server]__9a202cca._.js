module.exports = [
"[project]/.next-internal/server/app/api/chatbot/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/chatbot/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
const runtime = 'nodejs';
;
// Optionnel: si vous fournissez OPENAI_API_KEY dans .env, l'API utilisera OpenAI
// pour formuler les réponses en respectant strictement le contenu du portfolio.
// Sinon, on utilise la logique locale simple déjà implémentée.
const OPENAI_KEY = process.env.OPENAI_API_KEY;
// Contenu statique du portfolio utilisé par l'IA locale
const PORTFOLIO = {
    about: `Administrateur Base de Données curieux et passionné, j’aime concevoir des sites web modernes, rapides et faciles à utiliser. Étudiant en IA & Big Data, attentif aux détails, toujours motivé à apprendre.`,
    projects: [
        {
            name: 'Suivi de Dépense',
            description: "Suivi de Dépense est un outil web dédié à la gestion de vos finances. Il vous permet de suivre vos revenus et vos dépenses facilement, et d’avoir une vue claire sur vos flux financiers.",
            link: 'https://bytedepense.netlify.app/',
            github: 'https://github.com/tresor228/mini-depense-web.git',
            tools: 'Golang, JavaScript, HTML & CSS',
            year: '2025'
        },
        {
            name: 'Pitch IA',
            description: "PICTCH IA est une plateforme qui utilise l’intelligence artificielle pour identifier et prédire la cible d’un projet",
            link: 'https://app-pitch.onrender.com',
            github: 'https://github.com/tresor228/Pitch-IA.git',
            tools: 'Golang, HTML & CSS',
            year: '2025'
        },
        {
            name: 'Micro-Cours',
            description: "Micro-Cours est une plateforme d'apprentissage en ligne qui propose des cours sur divers sujets.",
            link: 'https://micro-cour.vercel.app/',
            github: 'https://github.com/tresor228/micro-learn.git',
            tools: 'FIREBASE, JavaScript, HTML & CSS',
            year: '2025'
        }
    ],
    skills: [
        'JavaScript',
        'Git',
        'PostgreSQL',
        'Go',
        'Postman',
        'Supabase',
        'React',
        'Mysql'
    ],
    contact: {
        email: 'bernardalade92@gmail.com',
        cv: 'https://drive.google.com/file/d/1rYOaQyPrFcTkXTCAEPodT1CtUVposwTi/view?usp=drive_link'
    },
    certification: 'Mes certifications et accréditations professionnelles seront disponibles prochainement.'
};
function findRelevantSections(message) {
    const lower = message.toLowerCase();
    const hits = [];
    // About
    if (lower.includes('à propos') || lower.includes('qui es') || lower.includes('administrateur') || lower.includes('ia') || lower.includes('big data') || lower.includes('profil')) {
        hits.push(`À propos: ${PORTFOLIO.about}`);
    }
    // Projects
    for (const p of PORTFOLIO.projects){
        const nameLower = p.name.toLowerCase();
        if (lower.includes(nameLower) || lower.includes('projet') || lower.includes('projets') || lower.includes(p.tools?.toLowerCase?.())) {
            hits.push(`Projet — ${p.name}: ${p.description} (Outils: ${p.tools}; Année: ${p.year}; Démo: ${p.link}; GitHub: ${p.github})`);
            break;
        }
    }
    // Skills
    for (const s of PORTFOLIO.skills){
        if (lower.includes(s.toLowerCase())) {
            hits.push(`Compétence détectée: ${s}`);
            break;
        }
    }
    // Contact
    if (lower.includes('contact') || lower.includes('email') || lower.includes('cv') || lower.includes('cv')) {
        hits.push(`Contact: email — ${PORTFOLIO.contact.email}; CV: ${PORTFOLIO.contact.cv}`);
    }
    // Certification
    if (lower.includes('certificat') || lower.includes('certification')) {
        hits.push(`Certification: ${PORTFOLIO.certification}`);
    }
    return hits;
}
async function POST(req) {
    try {
        const { message } = await req.json();
        if (!message || typeof message !== 'string') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Message invalide'
            }, {
                status: 400
            });
        }
        // REQUIRE: OpenAI key must be present — all responses come from OpenAI
        if (!OPENAI_KEY) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'OPENAI_API_KEY manquante. Configurez OPENAI_API_KEY dans vos variables d\'environnement.'
            }, {
                status: 500
            });
        }
        try {
            const systemPrompt = `Vous êtes l'assistant professionnel du portfolio de Trésor. Vous pouvez saluer l'utilisateur, répondre poliment, remercier et poser des questions de clarification de manière professionnelle. Pour les réponses factuelles, UTILISEZ UNIQUEMENT le contenu fourni ci-dessous comme source de référence. IMPORTANT : FORMULEZ vos réponses ENTIÈREMENT EN VOS PROPRES MOTS — ne copiez pas littéralement le texte fourni, n'extrayez pas des passages tels quels et n'incluez pas le JSON brut. Si la question porte sur un sujet absent du portfolio, répondez exactement : "Désolé — je suis uniquement l'assistant du portfolio de Trésor. Je ne peux répondre qu'aux questions portant sur le contenu de ce portfolio.". Répondez toujours en français, adoptez un ton professionnel et clair, et, si utile, proposez une brève suggestion d'action ou un lien présent dans le portfolio.`;
            const portfolioContent = JSON.stringify(PORTFOLIO);
            const payload = {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt + '\n\nCONTENU:' + portfolioContent
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ],
                temperature: 0.2,
                max_tokens: 800
            };
            const resp = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${OPENAI_KEY}`
                },
                body: JSON.stringify(payload)
            });
            // Parse JSON error/body from OpenAI and map to a clear response
            const j = await resp.json();
            if (!resp.ok) {
                const err = j?.error || {};
                const message = err?.message || 'Erreur OpenAI non détaillée';
                const type = err?.type;
                const code = err?.code;
                console.error('OpenAI error:', message, {
                    type,
                    code
                });
                // Si quota insuffisant, renvoyer code 402 (Payment Required) sinon passer le status d'OpenAI
                const status = code === 'insufficient_quota' ? 402 : resp.status || 502;
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: message,
                    type,
                    code
                }, {
                    status
                });
            }
            const reply = j?.choices?.[0]?.message?.content?.trim();
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                reply: reply || 'Aucune réponse fournie par OpenAI.',
                sources: [
                    'openai',
                    'portfolio'
                ]
            });
        } catch (err) {
            console.error('Erreur OpenAI:', err);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Erreur lors de l\'appel à OpenAI'
            }, {
                status: 500
            });
        }
    } catch (error) {
        console.error('chatbot error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Erreur serveur'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9a202cca._.js.map