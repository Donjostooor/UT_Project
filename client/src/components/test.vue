<template>
    <div>
        <div class="w-3/4 m-auto">
            <div>
                <h1 class="text-2xl text-gray-800">Object detection with Tensorflow</h1>
                <div class="bg-gray-300 h-64 w-full rounded-lg shadow-md bg-cover bg-center">
                    <video id="video" ref="videoRef" autoplay></video>
                </div>
            </div>
        </div>
        <div v-if="!isStreaming">
            <button @click="openCamera">Open Camera</button>
        </div>
        <div v-else class="flex justify-between">
            <button @click="stopStreaming">Stop Streaming</button>
            <button @click="snapshot">Snapshot</button>
            <button @click="detect" :disabled="isLoading">
                <span v-if="isLoading">Loading ...</span>
                <span v-else>Detect Object</span>
            </button>
        </div>
    </div>

    <div>
        <div>Teachable Machine Image Model</div>
        <button @click="init">Start</button>
        <div id="webcam-container"></div>
        <div id="label-container">
            <div v-for="(label, index) in labels" :key="index">{{ label }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import { defineComponent } from 'vue';
import * as tf from "@tensorflow/tfjs/dist/tf";
import * as tmImage from "@teachablemachine/image/dist";

import * as cocossd from '@tensorflow-models/coco-ssd';

export default defineComponent({
    name: 'ObjectDetection',
    setup() {
        const videoRef = ref<HTMLVideoElement | null>(null);
        const imgRef = ref<HTMLImageElement | null>(null);
        const result = ref<Array<any>>([]);
        const isLoading = ref(false);
        const isStreaming = ref(false);
        const labels = ref<string[]>([]);
        const maxPredictions = ref(0);
        let model: any;
        let webcam: any;
        let labelContainer: HTMLElement | null = null;

        onMounted(() => {
            openCamera();
        });

        async function detect() {
            if (videoRef.value) {
                isLoading.value = true;
                const model = await cocossd.load();
                const predictions = await model.detect(videoRef.value);
                result.value = predictions;
                isLoading.value = false;
                console.log(predictions);
            }
        }

        async function openCamera() {
            if (navigator.mediaDevices.getUserMedia) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    isStreaming.value = true;
                    if (videoRef.value) {
                        videoRef.value.srcObject = stream;
                    }
                } catch (error) {
                    console.error("Error accessing the camera:", error);
                }
            }
        }

        function stopStreaming() {
            if (videoRef.value && videoRef.value.srcObject) {
                const stream = videoRef.value.srcObject as MediaStream;
                const tracks = stream.getTracks();
                tracks.forEach((track) => track.stop());
                isStreaming.value = false;
            }
        }

        function snapshot() {
            if (videoRef.value && imgRef.value) {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
                canvas.width = 200;
                canvas.height = 200;
                ctx.drawImage(videoRef.value, 0, 0, 200, 200);
                const data = canvas.toDataURL("image/png");
                imgRef.value.setAttribute("src", data);
            }
        }

        async function init() {
            const URL = "https://teachablemachine.withgoogle.com/models/QYzonoEYw/";

            const modelURL = URL + "model.json";
            const metadataURL = URL + "metadata.json";

            model = await tmImage.load(modelURL, metadataURL);
            maxPredictions.value = model.getTotalClasses();

            const flip = true;
            webcam = new tmImage.Webcam(200, 200, flip);

            await webcam.setup();
            await webcam.play();
            window.requestAnimationFrame(loop);

            labelContainer = document.getElementById("label-container");
            for (let i = 0; i < maxPredictions.value; i++) {
                labels.value.push("");
            }
        }

        async function loop() {
            webcam.update();
            await predict();
            window.requestAnimationFrame(loop);
        }

        async function predict() {
            const prediction = await model.predict(webcam.canvas);
            for (let i = 0; i < maxPredictions.value; i++) {
                labels.value[i] =
                    prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            }
        }

        return {
            imgRef,
            detect,
            result,
            isStreaming,
            videoRef,
            openCamera,
            stopStreaming,
            snapshot,
            isLoading,
            init,
            labels
        };
    }
});
</script>

<style></style>
