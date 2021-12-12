<template>
  <div>
    <div>
      <b class="font-author"> {{ authorName }}</b>
      <b-icon
        icon="x-circle-fill"
        class="iconClass"
        @click="closeQuotes('close')"
      ></b-icon>
    </div>
    <div>
      <b-card
        class="card-class"
        v-for="quote in dataToRender.data"
        :key="quote.id"
      >
        <b-card-text>
          {{ quote.quoteText }}
        </b-card-text>
      </b-card>
    </div>

    <div class="pagination-class">
      <span
        class="material-icons icon-page-class"
        v-if="!disablePrev"
        @click="onChangePage('prev')"
      >
        arrow_back_ios
      </span>
      <span class="page-class"
        >{{ quoteGen.pagination.currentPage }} of
        {{ quoteGen.pagination.totalPages }}</span
      >
      <span
        class="material-icons icon-page-class"
        v-if="!disableNext"
        @click="onChangePage('next')"
      >
        arrow_forward_ios
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      quoteGen: [],
      goToNextPage: null,
      goToPrevPage: null,
      clickedPrev: false,
      clickedNext: false,
    };
  },
  props: ["quoteDataGenerated", "authorName"],

  computed: {
    disableNext() {
      if (
        this.quoteGen.pagination.currentPage ===
        this.quoteGen.pagination.totalPages
      ) {
        return true;
      }
      return false;
    },
    disablePrev() {
      return this.quoteGen.pagination.currentPage === 1 ? true : false;
    },

    dataToRender() {
      return this.quoteGen;
    },
  },
  created() {
    this.quoteGen = this.quoteDataGenerated;
  },
  methods: {
    ...mapActions({ getAllAuthQuotesOnChange: "getAllAuthQuotesOnChange" }),
    closeQuotes(close) {
      this.$emit("closeAllQuotes", close);
    },

    getAllQuotr() {
      let payload = {
        author: this.authorName,
        page: this.clickedPrev ? this.goToPrevPage : this.goToNextPage,
      };
      this.getAllAuthQuotesOnChange(payload)
        .then((res) => {
          if (res.status === 200) {
            this.quoteGen = res.data;
            return;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onChangePage(page) {
      if (page === "prev") {
        this.clickedPrev = true;
        this.clickedNext = false;
        if (this.quoteGen.pagination.currentPage > 1) {
          this.goToPrevPage = this.quoteGen.pagination.currentPage - 1;
          this.getAllQuotr();

          return;
        }
        this.goToPrevPage = 1;
      }
      if (page === "next" && this.quoteGen.pagination.nextPage) {
        this.clickedPrev = false;
        this.clickedNext = true;
        this.goToNextPage = this.quoteGen.pagination.currentPage + 1;
        this.getAllQuotr();
      }
    },
  },
};
</script>

<style scoped>
.iconClass {
  margin-left: 1rem;
  cursor: pointer;
}
.pagination-class {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.quote-class {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 15rem;
  position: relative;
}
.icon-page-class {
  cursor: pointer;
  margin-left: 0.5rem;
}
.icon-page-class :hover {
  transition: top 0.2s ease-in;
}
.card-class {
  width: 30rem;
  border-left-style: solid;
  border-left-color: #e1e167;
  border-width: medium;
  border-right: none;
  border-top: none;
  margin-top: 2rem;
  border-bottom: none;
}
.font-author {
  font-weight: 700;
}
.page-class {
  font-size: 15px;
  font-weight: 500;
  color: #9f9292;
}
</style>
