<script>
export default {
    props:{
        info: String,
        count: Number,
    },
}
</script>

<template>
    <span class="bg-white text-gray-500 py-2 px-3.5 rounded-md tracking-wide text-lg h-10">{{ info }}: {{ count }}</span>
</template>
