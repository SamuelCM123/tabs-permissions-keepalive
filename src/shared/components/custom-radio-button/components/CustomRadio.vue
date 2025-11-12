<script setup>

    // Importaciones Nativas
    import { ref, watchEffect } from 'vue';

    // Definiciones de Emits
    const emits = defineEmits(['update:modelValue','emitValueChange']);

    // Definiciones de props
    const props = defineProps({
        nameRadio: {type:null},
        isDisabled: {type:null, default: false},
        valueRadio: {type:null},
        valueSelected: {type:null},
    })

    /**
     * @type {Ref<String>} -Valor del input radio
     */
    let valueRadio = ref();

    const emitValue = () => {
        if(props.isDisabled) return
        emits('update:modelValue',valueRadio.value)
        emits('emitValueChange',valueRadio.value)
    }
    
    // Hooks 
    watchEffect(() => {
        // console.log('valueRadio:',props.valueRadio);
        // console.log('valueSelected:',props.valueSelected);
        valueRadio.value = props.valueSelected;
    })

</script>

<template>
    <div class="wrapper-inputs">
        <div 
            class="wrapper-checkbox"
            :class="{'wrapper-checkbox-disabled': props.isDisabled}"
            >
            <label 
                @keydown.enter="() => {
                    if(props.isDisabled) return
                    valueRadio = props.valueRadio
                    emitValue()
                }"
                class="radio-label"
                :class="{'radio-disabled': props.isDisabled}"
                :tabindex="props.isDisabled ? '-1': '0' "
            >
                <input 
                    tabindex="-1"
                    class="input-radio"
                    type="radio" 
                    name="group"
                    :value="props.valueRadio"
                    @change="emitValue()"
                    v-model="valueRadio"
                    />
                <div 
                    class="label-radio" 
                    :class="props.valueRadio === props.valueSelected ? 'radio-selected' : 'radio-no-selected'"
                ></div>
                <div 
                    class="text-mayus"
                    :class="props.valueRadio === props.valueSelected ? 'label-selected': 'label-no-selected'"
                >
                    {{ props.nameRadio }}
                </div>
            </label>
        </div>
    </div>
</template>

<style scoped>
@import url('../css/customInputs.css');
</style>