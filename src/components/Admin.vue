<template>
  <div class="vue-tempalte">
    <div class="vertical-center">
      <div class="inner-block">
        <div class="card">
          <div class="card-header">
            <div>
              <h3 align="center">Product List
                <router-link class=" btn btn-outline-info float-right  btn-sm" to="/product"
                             style="margin-bottom:
                  30px"> Add
                </router-link>
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
                <td><img width="50px" height="50px" :src="'http://localhost:8000/public/images/'+product.image" alt="">
                </td>
                <td>{{ product.description }}</td>
                <td>
                  <button type="button" class="btn btn-primary btn-sm" v-on:click="editProduct(product.id)"> Edit
                  </button>
                  <button type="button" class="btn btn-danger btn-sm" style="margin-left: 3px"
                          v-on:click="deleteProduct(product.id)"> Delete
                  </button>
                </td>

              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- edit product modal -->
        <div v-if="myModel">
          <transition name="model">
            <div class="modal-mask">
              <div class="modal-wrapper">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h4 class="modal-title">Product Edit</h4>
                      <button type="button" class="close float-right" @click="myModel=false"><span aria-hidden="true">
                        &times;</span>
                      </button>

                    </div>
                    <div class="modal-body">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Title </label>
                            <input type="text" v-model="title" class="form-control form-control-lg"/>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Price</label>
                            <input type="number" v-model="price" class="form-control form-control-lg"/>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="description">Description</label>
                        <textarea class="form-control" v-model="description" id="description" rows="3"></textarea>
                      </div>
                      <div class="form-group">
                        <label class="form-label" for="File">Image</label>
                        <input type="file" class="form-control form-control-lg" id="file" ref="file">
                      </div>
                      <input type="hidden" v-model="id">
                      <button type="button" v-on:click="productUpdate" class="btn btn-primary btn-lg btn-block">Submit
                      </button>
                      <br/>


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <!-- edit product modal -->
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
      products: [],
      allData: '',
      myModel: false,
      title: '',
      price: '',
      id: '',
      description: '',


    }
  },
  methods: {
    editProduct(id) {
      var application = this;
      const token = localStorage.getItem('token');
      // eslint-disable-next-line no-undef
      Swal.fire({
        title: 'Want to Edit this Product?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.get('http://localhost:8000/api/product-show/' + id,
              {headers: {"Authorization": `Bearer ${token}`}}).then(function (response) {

            application.id = response.data.data.id;
            application.title = response.data.data.title;
            application.price = response.data.data.price;
            application.description = response.data.data.description;
            application.myModel = true;
          });
        }
      });


    },
    deleteProduct(id) {
      const token = localStorage.getItem('token');
      // eslint-disable-next-line no-undef
      Swal.fire({
        title: 'Want to Delete this Product?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete('http://localhost:8000/api/product-delete/' + id,
              {headers: {"Authorization": `Bearer ${token}`}})
              .then(response => {
                // eslint-disable-next-line no-undef
                Swal.fire({
                  title: 'Product Successfully Deleted',
                  icon: 'success',
                  showCancelButton: false,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Ok'
                }).then((result) => {
                  if (result.isConfirmed) {
                    location.reload();
                  }
                });
                console.log(response);
              })
              .catch(e => {
                // eslint-disable-next-line no-undef
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                })
                location.reload();
                console.log(e);
              })


        }
      })

    },
    productUpdate() {
      let id = this.id;
      let title = this.title;
      let description = this.description;
      let price = this.price;
      const token = localStorage.getItem('token');
      axios.put('http://localhost:8000/api/product-update/' + id, {
        title,
        price,
        description
      }, {headers: {"Authorization": `Bearer ${token}`}})
          .then(response => {

            console.log(response);
            this.myModel = false;
            // eslint-disable-next-line no-undef
            Swal.fire({
              title: 'Product Successfully Updated',
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.isConfirmed) {
                location.reload();
              }
            });

          })
          .catch(e => {
            // eslint-disable-next-line no-undef
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
            console.log(e);
          })
    },

  },

  mounted() {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8000/api/product-list',
        {headers: {"Authorization": `Bearer ${token}`}}).then(response => {
      // JSON responses are automatically parsed.
      this.products = response.data.product
      console.log(response);
    })
  }
}
</script>
<style scoped>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

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