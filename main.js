
const API_KEY = "AIzaSyAsLv4TKqFItQ-infwIz-uatzI-Rtiz2nA";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

//
function formatResponse(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // bold
        .replace(/\n/g, "<br>"); // line breaks
}

// 
async function callGemini(prompt) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "Something went wrong");
        }

        return data.candidates[0].content.parts[0].text;

    } catch (error) {
        return "Error: " + error.message;
    }
}

// 
async function askAI() {
    const question = document.getElementById("questionInput").value.trim();
    const output = document.getElementById("answerOutput");

    if (!question) {
        output.innerHTML = "Please enter a question.";
        return;
    }

    output.innerHTML = "Thinking...";

    let finalPrompt;

    const lowerQuestion = question.toLowerCase();

    if (
        lowerQuestion.includes("deep") ||
        lowerQuestion.includes("detail") ||
        lowerQuestion.includes("explain in detail")
    ) {
        finalPrompt = `
You are a helpful assistant.
Give a deep and detailed explanation.
Use headings and examples if needed.

Question:
${question}
        `;
    } else {
        finalPrompt = `
You are a helpful assistant.
Answer briefly in 3-4 lines.
Use simple and clear language.
Do not give long explanations.

Question:
${question}
        `;
    }

    const result = await callGemini(finalPrompt);
    output.innerHTML = formatResponse(result);
}

// 
async function summarizeText() {
    const text = document.getElementById("summaryInput").value.trim();
    const output = document.getElementById("summaryOutput");

    if (!text) {
        output.innerHTML = "Please paste some text.";
        return;
    }

    output.innerHTML = "Summarizing...";

    const prompt = `
Summarize the following text in 4-5 short lines using simple language:

${text}
    `;

    const result = await callGemini(prompt);
    output.innerHTML = formatResponse(result);
}

// 
async function generateIdeas() {
    const topic = document.getElementById("ideaInput").value.trim();
    const output = document.getElementById("ideaOutput");

    if (!topic) {
        output.innerHTML = "Please enter a topic.";
        return;
    }

    output.innerHTML = "Generating ideas...";

    const prompt = `
Generate exactly 5 short bullet-point ideas about:
${topic}
    `;

    const result = await callGemini(prompt);
    output.innerHTML = formatResponse(result);
}

// 
async function getDefinition() {
    const term = document.getElementById("definitionInput").value.trim();
    const output = document.getElementById("definitionOutput");

    if (!term) {
        output.innerHTML = "Please enter a term.";
        return;
    }

    output.innerHTML = "Finding definition...";

    const prompt = `
Give a clear and simple definition in only 2 lines for:
${term}
    `;

    const result = await callGemini(prompt);
    output.innerHTML = formatResponse(result);
}