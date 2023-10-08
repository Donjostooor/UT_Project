import { ref } from "vue";
import { defineComponent } from "vue";
import * as tmImage from "@teachablemachine/image/dist";

export default defineComponent({
name: "CombinedComponent",
setup() {
const maxClassName = ref<string>("");
const maxProbability = ref<number>(0);
const imageSrc = ref<string | null>(null);

async function init() {
const URL = "https://teachablemachine.withgoogle.com/models/tqaBNbyzU/";
const modelURL = URL + "model.json";
const metadataURL = URL + "metadata.json";

const model = await tmImage.load(modelURL, metadataURL);
const maxPredictions = model.getTotalClasses();

console.log("System Start Right Now!");

const image = new Image();
image.src = imageSrc.value as string;

image.onload = async () => {
const prediction = await model.predict(image, false);

let maxProbabilityValue = -Infinity;
let maxClassNameValue = "";

for (let i = 0; i < maxPredictions; i++) {
const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);

console.log(classPrediction);

const probabilityValue = prediction[i].probability;

if (probabilityValue > maxProbabilityValue) {
maxProbabilityValue = probabilityValue;
maxClassNameValue = prediction[i].className;
}
}

maxClassName.value = maxClassNameValue;
maxProbability.value = maxProbabilityValue;
};
}

async function onFileChange(event: Event) {
const fileInput = event.target as HTMLInputElement;
if (fileInput.files && fileInput.files[0]) {
const reader = new FileReader();

reader.onload = function (e) {
if (imageSrc.value) {
imageSrc.value = e.target?.result as string;
}
};

reader.readAsDataURL(fileInput.files[0]);
} else {
removeUpload();
}
}

function removeUpload() {
const fileInput = document.querySelector(".file-upload-input") as HTMLInputElement;
if (fileInput) {
fileInput.value = "";
}

if (imageSrc.value) {
imageSrc.value = null;
}
}

async function predict() {
// Perform prediction logic here, same as in init()
// ...
// Update HTML elements with the results
// ...
// For example, you can set the results like this:
// maxClassName.value = "Some Food";
// maxProbability.value = 0.85;
}

return {
maxClassName,
maxProbability,
init,
onFileChange,
removeUpload,
predict,
isDragActive: false,
dragText: 'Drag & Drop',
imageSrc: null as string | null,
};
},
methods: {
browseFile() {
(this.$refs.fileInput as HTMLInputElement).click();
},
onDragOver(event: DragEvent) {
event.preventDefault();
this.dragText = 'Release to Upload';
this.isDragActive = true;
},
onDragLeave() {
this.dragText = 'Drag & Drop';
this.isDragActive = false;
},
onDrop(event: DragEvent) {
event.preventDefault();
this.isDragActive = false;
const fileInput = event.dataTransfer.files[0];
this.displayFile(fileInput);
},
displayFile(file: File) {
const validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
if (validExtensions.includes(file.type)) {
const fileReader = new FileReader();
fileReader.onload = () => {
this.imageSrc = fileReader.result as string;
};
fileReader.readAsDataURL(file);
this.dragText = 'Image Uploaded';
this.isDragActive = false;
} else {
alert('This file is not an Image');
this.isDragActive = false;
}
},
},
});
