const messages = document.getElementById("messages");
const historyList = document.getElementById("historyList");

showSection("dashboard");

function showSection(id) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");

    if (window.innerWidth < 900) {
        document.querySelector(".sidebar").classList.remove("active");
    }
}

function toggleMenu() {
    document.querySelector(".sidebar").classList.toggle("active");
}

function addMessage(text, type) {

    const div = document.createElement("div");

    div.className = "msg " + type;

    div.innerText = text;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;
}

function saveHistory(text) {

    const item = document.createElement("div");

    item.innerText = text;

    historyList.prepend(item);
}

addMessage(
    "👋 Hello! I am MediVision AI. Ask me any health-related question.",
    "bot"
);

function sendMessage() {

    const input = document.getElementById("question");

    const q = input.value.trim();

    if (!q) return;

    addMessage(q, "user");

    saveHistory(q);

    input.value = "";

    const typing = document.createElement("div");

    typing.className = "msg bot";

    typing.id = "typing";

    typing.innerText = "🩺 Analyzing...";

    messages.appendChild(typing);

    setTimeout(() => {

        document.getElementById("typing").remove();

        const lower = q.toLowerCase();

        let response = "";

        if (
            lower.includes("heart attack") ||
            lower.includes("chest pain") ||
            lower.includes("stroke") ||
            lower.includes("can't breathe")
        ) {

            response =
                "🚨 Emergency symptoms detected.\n\nPlease seek immediate medical attention.";

            const alertBox =
                document.getElementById("alertCount");

            alertBox.innerText =
                Number(alertBox.innerText) + 1;
        }

        else if (lower.includes("fever")) {

            response =
                "🌡 Fever may be caused by viral infections, flu, or other illnesses. Stay hydrated and monitor your temperature.";

        }

        else if (lower.includes("headache")) {

            response =
                "🧠 Headaches can occur due to stress, dehydration, lack of sleep, or illness. Persistent headaches should be evaluated by a doctor.";

        }

        else if (lower.includes("diabetes")) {

            response =
                "🩸 Diabetes affects blood sugar regulation. Common symptoms include thirst, fatigue, and frequent urination.";

        }

        else if (
            lower.includes("blood pressure") ||
            lower.includes("hypertension")
        ) {

            response =
                "❤️ High blood pressure often has no symptoms. Regular monitoring and healthy lifestyle habits are important.";

        }

        else if (lower.includes("cough")) {

            response =
                "🤧 A cough may result from infections, allergies, or irritation. Seek medical advice if it persists.";

        }

        else {

            response =
                "🩺 I can provide educational medical information about symptoms, diseases, wellness, and medical terminology. I cannot provide a diagnosis.";

        }

        addMessage(response, "bot");

    }, 1200);
}

function summarizeReport() {

    const report =
        document.getElementById("report").value;

    if (!report.trim()) return;

    const summary =
        report.split(" ").slice(0, 60).join(" ");

    addMessage(
        "📄 Report Summary:\n\n" + summary + "...",
        "bot"
    );

    const reports =
        document.getElementById("reportsCount");

    reports.innerText =
        Number(reports.innerText) + 1;
}

document
.getElementById("imageUpload")
.addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        const img =
            document.getElementById("preview");

        img.src =
            event.target.result;

        img.style.display =
            "block";

        addMessage(
            "🖼 Medical image uploaded successfully.",
            "bot"
        );
    };

    reader.readAsDataURL(file);
});

function startVoice() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        alert(
            "Voice recognition is not supported in this browser."
        );

        return;
    }

    const recognition =
        new SpeechRecognition();

    recognition.start();

    recognition.onresult = (event) => {

        document.getElementById("question").value =
            event.results[0][0].transcript;
    };
}