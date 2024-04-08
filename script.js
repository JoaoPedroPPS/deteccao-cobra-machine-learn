const URL = "./modelo/";

let model, labelContainer, maxPredictions;

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    predict();
}

async function predict() {
    const predictions = await model.predict(document.getElementById("preview"));

    // Encontra a predição com maior probabilidade
    const maxPrediction = predictions.reduce((prev, current) =>
        prev.probability > current.probability ? prev : current
    );

    // Remove a classe 'select' de todas as opções
    const options = document.querySelectorAll(".options ul li");
    options.forEach(option => {
        option.classList.remove("select");
    });

    // Define a classe 'select' para a cobra com maior probabilidade
    const snakeType = maxPrediction.className.toLowerCase().replace(' ', '_');
    const snakeElement = document.getElementById(snakeType);
    if (snakeElement) {
        snakeElement.classList.add('select');
    }
    
    // Após identificar a cobra prevista (no final da função predict()), chame a função exibirCuriosidade() passando o ID da cobra
    exibirCuriosidade(maxPrediction.className.toLowerCase().replace(' ', '_'));



}

function exibirCuriosidade(cobraIdentificada) {
    const curiosidadeCobraDiv = document.getElementById("curiosidadeCobra");
    let curiosidade = "";

    switch (cobraIdentificada) {
        case "coral":
            curiosidade = "O coral é uma serpente altamente venenosa encontrada em regiões tropicais e subtropicais. Uma curiosidade fascinante sobre a cobra coral é que sua coloração vibrante, com listras vermelhas, pretas e brancas, serve como um aviso visual para possíveis predadores. Essas cores brilhantes são um indicativo de seu veneno potente, alertando outros animais para ficarem longe.";
            break;
        case "mamba_negra":
            curiosidade = "A mamba negra é conhecida como uma das cobras mais venenosas e rápidas do mundo. Uma curiosidade intrigante sobre esta cobra é sua habilidade de atingir velocidades de até 20 quilômetros por hora em terra, tornando-a uma das cobras mais rápidas já registradas. Além disso, seu veneno neurotóxico pode ser fatal para humanos se não tratado rapidamente.";
            break;
        case "cipo":
            curiosidade = "A cobra cipó, como o próprio nome sugere, é conhecida por sua habilidade de se camuflar perfeitamente em meio a galhos e folhagens. Uma curiosidade interessante é que ela é uma ótima nadadora e pode ser encontrada em áreas alagadas da América do Sul. Sua aparência fina e longa a torna particularmente adaptada para se locomover através de água e vegetação densa.";
            break;
        default:
            curiosidade = "Não foi possível encontrar informações sobre esta cobra.";
            break;
    }

    curiosidadeCobraDiv.innerText = curiosidade;
}



function previewImage() {
    var image = document.querySelector("input[name=image]").files[0];
    var preview = document.getElementById("preview");
    var reader = new FileReader();
    reader.onloadend = () => {
        preview.src = reader.result;
    };

    if (image) {
        reader.readAsDataURL(image);
        document.getElementById("location-src").innerText = image.name;
    } else {
        preview.src = "";
    }
}
