<template>
  <div class="vue-tempalte">
    <div class="vertical-center">
      <div class="inner-block">
        <div class="card">
          <div class="card-header">
            <div>
              <h3 align="center">Product List
                <button type="button" class="btn btn-primary float-right" v-on:click=createProduct
                        style="margin-bottom:
                  30px"> Add
                </button>
              </h3>

            </div>

          </div>
          <div class="card-body">
            <table class="table table-striped table-bordered table-hover ">
              <thead>
              <tr>
                <th scope="col">Sl No.</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Image</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr scope="row" v-for="(product,index) in products" :key="product.id">
                <td>{{ ++index }}</td>
                <td>{{ product.title }}</td>
                <td>{{ product.price }}</td>
                <!--                  <td><img :src="'http://localhost:8000/public/' +product.description" alt=""></td>-->
                <td>{{ product.description }}</td>
                <td>
                  <button type="button" class="btn btn-primary btn-sm "> Edit</button>
                  <button type="button" class="btn btn-danger btn-sm" style="margin-left: 3px"
                          v-on:click="deleteProduct(product.id)"> Delete
                  </button>
                </td>

              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// eslint-disable-next-line no-undef
import axios from 'axios';

export default {
  data() {
    return {
      products: []
    }
  },
  methods: {
    deleteProduct(id) {
      // eslint-disable-next-line no-undef
      Swal.fire({
        title: 'Are you sure?',
        text: "Want to Delete this Product",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete('http://localhost:8000/api/product-delete/' + id)
              .then(response => {
                // eslint-disable-next-line no-undef
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                location.reload();
                console.log(response);
              })
          // .catch(e => {
          //   this.errors.push(e)
          // })


        }
      })

    },
    createProduct() {

    },
  },

  mounted() {
    axios.get('http://localhost:8000/api/product-list')
        .then(response => {
          // JSON responses are automatically parsed.
          this.products = response.data.product
          console.log(response);
        })
    // .catch(e => {
    //   this.errors.push(e)
    // })
  }
}
</script>
<style scoped>
* {
  box-sizing: border-box;
}

body {
  background: #2554FF !important;
  min-height: 100vh;
  display: flex;
  font-weight: 400;
}

body,
html,
.App,
.vue-tempalte,
.vertical-center {
  width: 100%;
  height: 100%;
}

.navbar-light {
  background-color: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
}

.vertical-center {
  display: flex;
  text-align: left;
  justify-content: center;
  flex-direction: column;
}

.inner-block {
  width: 100%;
  /*margin: auto;*/
  margin-top: 30px;
  margin-bottom: 30px;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all .3s;
}

.vertical-center .form-control:focus {
  border-color: #2554FF;
  box-shadow: none;
}

.vertical-center h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}

label {
  font-weight: 500;
}

.forgot-password,
.forgot-password a {
  text-align: right;
  font-size: 13px;
  padding-top: 10px;
  color: #7a7a7a;
  margin: 0;
}

.forgot-password a {
  color: #2554FF;
}

.social-icons {
  text-align: center;
  font-family: "Open Sans";
  font-weight: 300;
  font-size: 1.5em;
  color: #222222;
}

.social-icons ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.social-icons ul li {
  display: inline-block;
  zoom: 1;
  width: 65px;
  vertical-align: middle;
  border: 1px solid #e3e8f9;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  margin-right: 5px;
  background: #f4f6ff;
}

.social-icons ul li a {
  display: block;
  font-size: 1.4em;
  margin: 0 5px;
  text-decoration: none;
}

.social-icons ul li a i {
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -ms-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.social-icons ul li a:focus i,
.social-icons ul li a:active i {
  transition: none;
  color: #222222;
}
</style>