<template>
  <div>
    <div class="quote-class" v-if="!isQuotePresent">
      <b-card class="card-class">
        <b-card-text>
          <div>"{{ randomQuoteGenerated.quoteText }}"</div>
        </b-card-text>
      </b-card>
      <span class="random-parent">
        <span class="generate" @click="reloadPage">{{ "Random Quote" }}</span>
        <span class="material-icons"> 3d_rotation </span>
      </span>
    </div>

    <div :class="!isQuotePresent ? 'auother-class' : 'auother-class-all'">
      <b-card :class="!isQuotePresent ? 'author-card-class' : 'auth-class'"
        ><auother
          :quoteDetails="randomQuoteGenerated"
          @quotePresence="quotePresence"
          :usedInAuthoer="true"
      /></b-card>
    </div>
  </div>
</template>

<script>
import Auother from "./Auother.vue";
import { mapActions } from "vuex";
export default {
  components: { Auother },
  name: "QuoteGenrator",
  data() {
    return {
      randomQuoteGenerated: [],
      isQuotePresent: false,
      usedInAuth: false,
    };
  },
  methods: {
    ...mapActions({ randomQuotes: "randomQuotes" }),
    reloadPage() {
      window.location.reload();
    },
    quotePresence(quotePresent) {
      this.isQuotePresent = quotePresent;
    },
  },

  async created() {
    let res = await this.randomQuotes();
    let { data: quoteData } = res;

    let randomNumber = Math.floor(Math.random() * 10);
    this.randomQuoteGenerated = quoteData.data.filter((v) => {
      return {
        ...v,
      };
    })[randomNumber];
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.quote-class {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 15rem;
  position: relative;
}
.card-class {
  width: 30rem;
  border-left-style: solid;
  border-left-color: #e1e167;
  border-width: medium;
  border-right: none;
  border-top: none;
  border-bottom: none;
}
.auother-class {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 2rem;
}
.auother-class-all {
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 2rem;
}

.author-card-class {
  border: none;
}
.auth-class {
  border: none;
}
.author-card-class :hover {
  cursor: pointer;
  background-color: rgb(43, 39, 39);
  color: white;
}
.generate {
  color: dimgrey;
  cursor: pointer;
}
.random-parent {
  position: absolute;
  bottom: 9rem;
}
</style>
