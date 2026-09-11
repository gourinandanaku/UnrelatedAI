from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)


# --------------------------------------------------
# HOME PAGE
# --------------------------------------------------

@app.route("/")
def home():
    return render_template("index.html")


# --------------------------------------------------
# RANDOM UNRELATED RESPONSES
# --------------------------------------------------

responses = [
    # 😂 Random Kerala / Manglish
    "Nammude veetile fan innu kurachu over confident aanu. 😂",
    "Oru coconut tree undallo... athinu innu vere level attitude aanu. 🥥😂",
    "Pressure cooker innu moonu whistle adichittu resignation letter koduthu. 😂",
    "Nammude naattil oru poocha government officer pole nadakkunnundu. 🐱",
    "Tea shop uncle innu unnecessary philosophy class eduthu. ☕😂",
    "Oru slipper innale mysteriously disappear aayi. Investigation thudangi. 🩴",
    "Ee ceiling fan ithra confidence-ode karangunnathinte secret enthaavo? 😭",
    "Oru mosquito enne innale motivational speech kondu torture cheythu. 🦟",
    "Nammude fridge enne nokki judgement pass cheyyunnundennu thonnunnu. 😂",
    "Dosa innu pan-ne vittittu pokan refuse cheythu. 😭",
    "Oru dog bus stop-il nilkkunnu... ticket edukkaan marannathaanennu thonnunnu. 🐶",
    "Oru banana-ne innale VIP treatment aanu koduthath. 🍌😂",
    "Charger oru specific angle-il mathram work cheyyunnu. Athinte attitude vere level aanu. 😭",
    "Lift innu randam floor-il nirthathe direct attitude kaanichu. 😂",
    "Oru cricket ball career change cheyyan plan cheyyunnundennu kett. 🏏",
    "Bicycle innu existential crisis-il aanu. 🚲😭",
    "Fan-um AC-yum thammil oru family dispute nadakkunnundu. 😂",
    "Oru lonely umbrella mazha varan vendi waiting aanu. ☂️",
    "Kerala bus innu oru cinema hero pole dramatic entry eduthu. 🚌😂",

    # 🤣 More nonsense
    "Oru spoon missing aanu. Case investigation officially started. 🥄",
    "Nammude pillow innu emotional support department aanu. 😂",
    "Oru biscuit tea-il veenu... pinne athinte life complete aayi. ☕😂",
    "Oru crow innu morning meeting conduct cheythu. Enikku onnum manasilayilla. 🐦",
    "Nammude window curtain innu wind-ode serious dance competition aanu. 😂",
    "Oru tomato fridge-il vechu retirement eduthu. 🍅😭",
    "Oru auto driver Google Maps-ne 'nee vazhi parayanda' ennu paranjennu kett. 😂",
    "Oru chair athu throne aanu ennu vishwasichu irikkunnu. 👑",
    "Rice cooker revolution start cheyyan plan cheyyunnu. 🍚😂",
    "Oru coconut wrong time-il veenu... physics itself confused aayi. 🥥😭",
    "Nammude veetile clock innu time parayan mood-il alla. 😂",
    "Oru bucket innale bathroom-il ninnu escape cheyyan try cheythu. 😭",
    "Nammude gate-inu innu unnecessary security attitude aanu. 😂",
    "Watermelon celebrity aayennu kett. 🍉😂",
    "Oru fish innale humans-inte fashion judge cheythu. 🐟😭",
    "Street dog election-il nilkkan pokunnundennu rumours undu. 🐕😂",
    "Oru pencil innu ezhuthan completely refuse cheythu. ✏️",
    "Oru crow enne nokki chirichu. Athu personal aanennu thonnunnu. 🐦😂",
    "Oru bucket-inu innu career change venamennu thonnunnu. 😭",

    # 🎬 Movie-style / mass dialogues
    "Ivide rules onnum illa... only vibes aanu. 😎🔥",
    "Nee chodichath vere aanu, njan parayunnath vere aanu. Athaanu concept. 😂",
    "Scene complicated aanu mone... pakshe tea ready aanu. ☕🔥",
    "Ithokke oru simulation aanu. Coconut aanu real boss. 🥥😎",
    "Mass kaanikkanda... fan already mass aanu. 😂",
    "Dialogue parayan vannatha... pakshe dialogue thanne enne vittupoyi. 😭",
    "Mission failed successfully. 😂",
    "Plan undayirunnu... pinne plan thanne missing aayi. 😭",
    "Situation control-il aanu... aarude control aanennu ariyilla. 😂",
    "Njan answer tharilla. Njan atmosphere create cheyyum. 😎",
    "Ithinte answer Google-il illa. Tea kada-il undaavum. ☕😂",
    "Hero entry kazhinju... story evide pokunnu ennu ariyilla. 🎬",
    "Background music illa... athukondu scene cancel. 😂",
    "Nammal serious aayirunnu. Pinne oru banana vannu. 🍌😭",

    # 😭 College life
    "Assignment submit cheyyan poyappo pen enne betray cheythu. 😭",
    "Attendance nokkiyappo calculator polum silent aayi. 😂",
    "Lab-il system enne kandappo thanne restart aayi. 💻😭",
    "Viva question vannu... njan question-ne nokki, question enne nokki. 😂",
    "Internal mark oru mysterious species aanu. 🥲",
    "Project deadline enne chase cheyyunnu. 🏃😭",
    "Compiler error kandittu njan thanne error aayi. 💻😂",
    "Code work cheythu. Enthukondennu chodikkaruthu. 😭",
    "Presentation slide number 7 enne personally attack cheythu. 😂",
    "BTech student life: coffee + deadline + existential crisis. ☕😭",
    "Teacher: 'Any doubts?' Me: 'Yes, life.' 😂",
    "Project group-il oraal always 'njan nokkikko' ennu parayum. Pinne kandittilla. 😭",
    "Laptop fan innu viva attend cheyyunnath pole sound undakkunnu. 💻😂",
    "Debug cheythu cheythu bug-ine friend aakki. 😭",

    # 🤖 Tech nonsense
    "WiFi router innu network alla, emotional support aanu. 📶😂",
    "Bluetooth enne ignore cheyyunnu. Personal issue aanu. 😭",
    "Keyboard-il oru key innu strike aanu. ⌨️😂",
    "Mouse left click-inu innu confidence kuravanu. 🖱️",
    "RAM enne kandappo memory lose cheythu. 😂",
    "CPU innu overthinking mode-il aanu. 🤖😭",
    "Database-il oru row missing aanu. Athu vacation poyathaanennu thonnunnu. 😂",
    "Python snake innu coding cheyyan refuse cheythu. 🐍",
    "Java coffee chodichu. ☕😂",
    "HTML innu CSS-ode vazhakkittu. 😭",
    "Git commit cheythu... pinne regret cheythu. 😂",
    "VS Code enne nokki 'again?' ennu chodichu. 💻😭",
    "Bug fix cheythappo randu puthiya bugs vannu. Traditional programming. 😂",
    "Internet slow alla... internet simply thinking aanu. 😭",

    # 🥥 Kerala special
    "Chaya kudichillenkil system boot aavilla. ☕😂",
    "Parotta innu emotional support food aanu. 🫓😭",
    "Puttu kandappo kadala curry happy aayi. 😂",
    "Moru curry innu unnecessary confidence kaanikkunnu. 😎",
    "Coconut oil bottle enne kandittu proud aayi. 🥥😂",
    "Mazha varumennu nokki irunnu... mazha enne nokki irunnu. 🌧️😭",
    "Kappa innu political speech nadathi. 😂",
    "Appam innu round aakan refuse cheythu. 😭",
    "Sambar-il oru vegetable enne suspicious aayi nokki. 😂",
    "Nammude naatile auto speed physics-ne challenge cheyyunnu. 🛺",
    "KSRTC bus innu Fast & Furious remake cheythu. 🚌🔥",
    "Oru rubber slipper aanu ivide real transport system. 😂",
    "Coconut tree aanu ivide actual WiFi tower. 🥥📶",
    "Mazha + chaya + pakoda = life solved. ☕😂",

    # 🌀 Completely random
    "Oru penguin Kerala-il varan ticket book cheythu. 🐧😂",
    "Moon innu night shift-il late aayi. 🌙😭",
    "Oru potato enne motivational speaker aakkan nokki. 🥔😂",
    "Socks thammil family reunion nadakkunnu. 🧦",
    "Oru watermelon gym-il join cheythu. 🍉🏋️",
    "Oru cloud innu square shape try cheythu. ☁️😂",
    "Oru tomato football kalikkan poyi. 🍅⚽",
    "Oru spoon-inu swimming padikkanamennu thonnunnu. 🥄😂",
    "Oru refrigerator Antarctica-lekku transfer chodichu. 😭",
    "Oru pillow innu CEO aanu. 👑",
    "Oru mosquito passport edukkan line-il nilkkunnu. 🦟😂",
    "Oru potato laptop use cheyyunnath njan kandittundu. 🥔💻",
    "Oru clock innu 25 mani paranju. Mathematics resigned. 😂",
    "Oru umbrella sunny day-il celebrity aayi. ☂️😎",
    "Oru chair innu walking practice cheyyunnu. 😭",
    "Oru biscuit enne kandittu emotional aayi. 🍪😂",
    "Oru shoe innu left side mathram support cheyyunnu. 👟",
    "Oru watermelon enne kandittu 'bro' ennu vilichu. 🍉😂",
    "Oru fish YouTube channel start cheythu. 🐟📱"
]


# --------------------------------------------------
# AI CHAT
# --------------------------------------------------

@app.route("/api/chat", methods=["POST"])
def chat():

    try:
        data = request.get_json()

        user_message = data.get("message", "").strip()
        mode = data.get("mode", "normal")

        if not user_message:
            return jsonify({
                "error": "Please enter a message."
            }), 400

        # Pick a completely random response
        ai_response = random.choice(responses)

        # ------------------------------------------
        # Chaos statistics
        # ------------------------------------------

        if mode == "maximum":
            unrelatedness_score = random.randint(96, 100)
            chaos_level = random.randint(90, 100)

        elif mode == "malayalam":
            unrelatedness_score = random.randint(94, 100)
            chaos_level = random.randint(75, 95)

        else:
            unrelatedness_score = random.randint(90, 98)
            chaos_level = random.randint(65, 90)

        return jsonify({
            "response": ai_response,
            "unrelatedness_score": unrelatedness_score,
            "chaos_level": chaos_level
        })

    except Exception as e:

        print("ERROR:", repr(e))

        return jsonify({
            "error": "Something went wrong.",
            "response": "Oru coconut tree ippo meeting-il aanu. 🥥😂",
            "unrelatedness_score": 99,
            "chaos_level": 95
        }), 500


# --------------------------------------------------
# RUN SERVER
# --------------------------------------------------

if __name__ == "__main__":
    app.run(debug=True)