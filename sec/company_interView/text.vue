<template>
    <div>

    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
    setup () {
        const state = reactive({
            count: 0,
        })
    
        return {
            ...toRefs(state),
            increment () {
                state.count++
            }
            // increment: () => state.count++
        }
    }
}
</script>

<style lang="scss" scoped>

</style>