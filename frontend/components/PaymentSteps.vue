<template>
    <v-stepper v-model="currentStep">
        <v-stepper-header v-if="!isUserLogged">
            <v-stepper-step
                :complete="currentStep > 1"
                step="1"
            >
                Créer votre compte
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
                :complete="currentStep > 2"
                step="2"
            >
                Vos informations de livraison
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">
                Payement sécurisé
            </v-stepper-step>
        </v-stepper-header>
        <v-stepper-header v-else>
            <v-stepper-step
                :complete="currentStep > 1"
                step="1"
            >
                Vos informations de livraison
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="2">
                Payement sécurisé
            </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items v-if="!isUserLogged">
            <v-stepper-content step="1">
                <v-card>
                    <RegisterForm v-if="currentStep == 1" @successRegister="currentStep = 2" />
                </v-card>
            </v-stepper-content>
        </v-stepper-items>
        <v-stepper-items>
            <v-stepper-content :step="isUserLogged ? 1 : 2">
                <v-card>
                    <DeliveryInfosForm 
                        v-if="isUserLogged ? currentStep == 1 : currentStep == 2" 
                        @deliveryInfosUpdateSuccess="isUserLogged ? currentStep = 2 : currentStep = 3" 
                    />
                </v-card>
            </v-stepper-content>
        </v-stepper-items>
        <v-stepper-items>
            <v-stepper-content :step="isUserLogged ? 2 : 3">
                <v-card>
                    <PaypalButton 
                        v-if="isUserLogged ? currentStep == 2 : currentStep == 3" 
                        @transactionCompleted="$emit('transactionCompleted')" 
                    />

                    <v-btn
                        class="cart-return-button"
                        color="#7c9473"
                        @click="isUserLogged ? currentStep = 1 : currentStep = 2"
                    >
                        <v-icon class="mr-2">
                            mdi-keyboard-return
                        </v-icon>
                        Retour
                    </v-btn>
                </v-card>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
import RegisterForm from './RegisterForm'
import DeliveryInfosForm from './DeliveryInfosForm'
import PaypalButton from './PaypalButton'

export default {
  components: { RegisterForm, DeliveryInfosForm, PaypalButton },
  props: {},
  data() {
    return {
        e1: 1,
    };
  },
  computed: {
    isUserLogged() {
        return this.$store.state.isUserLogged;
    },
    currentStep: {
        get() {
            return this.e1;
        },
        set(value) {
            this.e1 = value;
        }
    },
  },
};
</script>
