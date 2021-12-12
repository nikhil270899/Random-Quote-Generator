<template>
  <div>
    <div class="child-class" v-if="!relatedQuotes && usedInAuthoer">
      <span class="mb-1">
        <b>{{ quoteDetails.quoteAuthor }} </b>
        <div>{{ quoteDetails.quoteGenre }}</div>
      </span>
      <span>
        <b-icon
          v-if="quoteDetails"
          icon="arrow-right-circle-fill"
          class="icon-class"
          @click="showRelatedQuotes"
        ></b-icon>
      </span>
    </div>

    <div class="genere-class text-muted">
      <all-quotes
        v-if="relatedQuotes"
        @closeAllQuotes="closeAllQuotes"
        :quoteDataGenerated="quoteDataGenerated"
        :authorName="authorName"
      />
    </div>
  </div>
</template>

<script>
import { BIcon } from "bootstrap-vue";
import AllQuotes from "./AllQuotes.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    "b-icon": BIcon,
    AllQuotes,
  },
  data() {
    return {
      relatedQuotes: false,
    };
  },
  props: {
    quoteDetails: {
      type: [Array, Object],
      default: null,
    },
    usedInAuthoer: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters({ auotherQuotes: "auotherQuotes" }),
  },
  methods: {
    ...mapActions({ getAllAuthourQuotes: "getAllAuthourQuotes" }),
    showRelatedQuotes() {
      this.getAllAuthourQuotes(this.quoteDetails.quoteAuthor)
        .then((res) => {
          if (res.status === 200) {
            this.relatedQuotes = true;
            this.quoteDataGenerated = res.data;
            this.authorName = this.quoteDetails.quoteAuthor;
            this.$emit("quotePresence", this.relatedQuotes);
          }

          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    closeAllQuotes(close) {
      this.relatedQuotes = false;
      this.$emit("quotePresence", this.relatedQuotes);

      console.log(close);
    },
  },
};
</script>

<style>
.child-class {
  display: flex;
  flex-direction: row;
  padding: 0.5rem 8rem 0.5rem 2rem;
}

.icon-class {
  margin-left: 57px;
}
</style>
