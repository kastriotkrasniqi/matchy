<script>
import Card from '../components/Card.vue';
import Moves from '../components/Moves.vue';
import Timer from '../components/Timer.vue';
import { CardController } from '../controllers/CardController.js';
import JSConfetti from 'js-confetti';

export default {
    components: {
        Card, Moves, Timer
    },
    data() {
        return {
            timer: 0,
            start: false,
            game: [],
            cards: [],
            settings: {
                level: 6,
                hideMoves: false,
                hideTimer: false,
            },
        };
    },
    computed: {
        win() {
            return this.game ? this.game.win : false;
        },
        gridSize() {
            // Calculate the number of cards in the grid based on the selected level
            if (this.settings.level === 6) {
                return { rows: 3, cols: 4 };
            } else if (this.settings.level === 8) {
                return { rows: 4, cols: 4 };
            } else if (this.settings.level === 10) {
                return { rows: 4, cols: 5 };
            } else if (this.settings.level === 15) {
                return { rows: 5, cols: 6 };
            }
        }

    },
    created() {
        this.game = new CardController();
        this.cards = this.game.cards;
    },

    methods: {
        flip(index) {
            if (this.game && this.start && !this.game.win) {
                this.game.flip(index);
            }
        },
        playAgain() {
            this.game = new CardController(this.settings.level);
            this.cards = this.game.cards;
            this.win = false;
            this.start = true;
        },
        changeLevel(level) {
            this.settings.level = level;
            this.game = new CardController(level);
            this.cards = this.game.cards;
        },
    },
    watch: {
        win(newValue) {
            if (newValue) {
                this.start = false;
                const jsConfetti = new JSConfetti()
                jsConfetti.addConfetti()
            }
        },

    },
}
</script>

<template>

    <div class="w-screen h-screen bg-emerald-100  grid place-items-center">
        <div v-if="!start && !win"
            class="absolute z-50 flex flex-col items-center justify-center bg-emerald-600 px-6 py-4 rounded-md shadow-xl border">
            <h2 class="text-white text-xl font-bold mb-2">Welcome to Memory Game!</h2>
            <button @click="start = true"
                class="text-white bg-gray-800 px-6 py-3 rounded-md shadow-lg hover:bg-gray-700 transition-colors">
                Start
            </button>
        </div>
        <div v-if="win" class="absolute z-50 text-white bg-gray-800 px-4 py-2 rounded-md h-36 w-48 shadow-xl border">
            <p class="text-lg mb-1 font-semibold text-emerald-400">You Win !</p>
            <p>Moves: {{ game.moves }}</p>
            <p class="mb-2">Time: {{ timer }}</p>
            <a @click="playAgain" class="font-medium text-md text-center cursor-pointer text-emerald-400">Play
                Again</a>
        </div>
        <div class="w-1/2 h-5/6 border-2 border-emerald-400 rounded-lg flex flex-col shadow-2xl"
            :class="{ 'blur-sm': !start || win }">
            <div class="h-16 w-full flex items-center  gap-4 bg-emerald-600 px-4 py-2">
                <Moves v-show="!settings.hideMoves" info="Moves" :count=game.moves />
                <Timer v-show="!settings.hideTimer" :start="start" @stoppedTime="time => timer = time" />
            </div>
            <div class="flex-1 bg-gray-300">
                <div class="grid gap-2.5 p-4 h-full"
                    :style="{ gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`, gridTemplateRows: `repeat(${gridSize.rows}, 1fr)` }">
                    <Card v-for="(card, index) in cards" :key="index" :id="index" :image="card.image"
                        :matched="card.matched" :flipped="card.flipped" @clicked="flip(index)" />
                </div>
            </div>
        </div>
        <div v-if="!start"
            class="absolute z-50 flex flex-col items-center justify-center bg-emerald-600 px-6 py-4 rounded-md shadow-xl border right-10 sm:right-20 md:right-24 lg:right-28 xl:right-40">
            <h3 class="text-white text-lg font-bold mb-4">Choose Level</h3>
            <div class="flex flex-wrap justify-center gap-2">
                <span @click="changeLevel(6)"
                    class="text-gray-800 bg-emerald-300 px-4 py-2 rounded-md shadow-md cursor-pointer hover:bg-emerald-400 transition-colors">4x3</span>
                <span @click="changeLevel(8)"
                    class="text-gray-800 bg-emerald-300 px-4 py-2 rounded-md shadow-md cursor-pointer hover:bg-emerald-400 transition-colors">4x4</span>
                <span @click="changeLevel(10)"
                    class="text-gray-800 bg-emerald-300 px-4 py-2 rounded-md shadow-md cursor-pointer hover:bg-emerald-400 transition-colors">5x4</span>
                <span @click="changeLevel(15)"
                    class="text-gray-800 bg-emerald-300 px-4 py-2 rounded-md shadow-md cursor-pointer hover:bg-emerald-400 transition-colors">6x5</span>
            </div>
            <h3 class="text-white text-lg font-bold mt-6 mb-2">Hide the Timer</h3>
            <div class="flex justify-center gap-2">
                <span @click="settings.hideTimer = true" :class="{ 'bg-emerald-500 text-white': settings.hideTimer }"
                    class="text-gray-800 bg-emerald-300 px-4 py-2 rounded-md shadow-md cursor-pointer hover:bg-emerald-400 transition-colors">ON</span>
                <span @click="settings.hideTimer = false" :class="{ 'bg-emerald-500 text-white': !settings.hideTimer }"
                    class="text-gray-800 bg-emerald-300 px-4 py-2 rounded-md shadow-md cursor-pointer hover:bg-emerald-400 transition-colors">OFF</span>
            </div>
            <h3 class="text-white text-lg font-bold mt-6 mb-2">Hide the Moves</h3>
            <div class="flex justify-center gap-2">
                <span @click="settings.hideMoves = true" :class="{ 'bg-emerald-500': settings.hideMoves }"
                    class="text-gray-800 bg-emerald-300 px-4 py-2 rounded-md shadow-md cursor-pointer hover:bg-emerald-400 transition-colors">ON</span>
                <span @click="settings.hideMoves = false" :class="{ 'bg-emerald-500': !settings.hideMoves }"
                    class="text-gray-800 bg-emerald-300 px-4 py-2 rounded-md shadow-md cursor-pointer hover:bg-emerald-400 transition-colors">OFF</span>
            </div>
        </div>
    </div>
</template>
