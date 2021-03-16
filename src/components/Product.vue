<template>
    <div class="vue-tempalte">
      <div class="vertical-center">
        <div class="inner-block">

            <h3>Product Create</h3>

          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Title </label>
                <input type="text" v-model="product.title"   class="form-control form-control-lg" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Price</label>
                <input type="number" v-model="product.price" class="form-control form-control-lg" />
              </div>
            </div>
          </div>
          <div class="form-group">
              <label for="description">Description</label>
              <textarea class="form-control" v-model="product.description" id="description" rows="3"></textarea>
            </div>
          <div class="form-group">
            <label class="form-label" for="File">Image</label>
            <input type="file" class="form-control form-control-lg"  id="file" ref="file" v-on:change="handleFileUpload()"/>
          </div>
          <button type="button" v-on:click="productAdd" class="btn btn-primary btn-lg btn-block">Submit</button>

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
              file: '',
              product :{
                title: '',
                price: '',
                description: ''
              }
            }
        },
        methods:{
          productAdd(){
            const token = localStorage.getItem('token');

            let formData = new FormData();
            formData.append('title',this.product.title);
            formData.append('price',this.product.price);
            formData.append('description',this.product.description);
            formData.append('image',this.file);
            console.log(formData);
              axios.post('http://localhost:8000/api/product-store',formData,
                  { headers: {
                      'Content-Type': 'multipart/form-data',
                    "Authorization" : `Bearer ${token}`}
                  })
                  .then(response => {
                    console.log(response.data.token);

                    // eslint-disable-next-line no-undef
                    Swal.fire({
                      title: 'Product Successfully Inserted',
                      icon: 'success',
                      showCancelButton: false,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Ok'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        this.$router.push({name: 'admin'})
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
                    console.log(e);
                  })

          },
          handleFileUpload(){
            this.file = this.$refs.file.files[0];
          }
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
  width: 750px;
  margin: auto;
  margin-top: 80px;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 15px 55px 15px 55px;
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
</style>>