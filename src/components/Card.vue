<script>
export default {
    emits: ['clicked'],
    props: {
        image: String,
        matched: Boolean,
        flipped: Boolean
    },


}
</script>

<template>

    <div @click="$emit('clicked')" class="group bg-emerald-600 text-white text-6xl [perspective:1000px] rounded-xl">
        <div class=" relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d]"
            :class="{
        '[transform:rotateY(180deg)]': flipped
    }">
            <div class="absolute inset-0 ">
                <img class="h-full w-full rounded-xl  shadow-xl shadow-black/40" src="/background-card.webp" alt="" />
            </div>
            <div v-if="flipped"
                class="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12  [transform:rotateY(180deg)] [backface-visibility:hidden] ">
                <div class="absolute inset-0">
                    <img class="rounded-xl  shadow-xl shadow-black/40 h-full w-full object-cover object-center"
                        :src="image" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>
