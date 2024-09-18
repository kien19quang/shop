import ApiClient from "@/configs/axiosConfig"
import { CreateProductDto } from "@/models/product/ProductModel"
import axios from "axios"

class ProductService {
  async getListProducts() {
    const response = await ApiClient.GET(`/product/products`)

    return response
  }

  async getDetailProduct(id: string) {
    const response = await ApiClient.GET(`/product/detail/${id}`)

    return response
  }

  async createProduct(data: CreateProductDto) {
    const response = await ApiClient.POST(`/product/create`, data)

    return response
  }

  async updateProduct(id: string, data: CreateProductDto) {
    const response = await ApiClient.PUT(`/product/update/${id}`, data)

    return response
  }

  async uploadImage(data: FormData) {
    try {
      const response = await axios.request({
        method: 'POST',
        data: data,
        url: 'https://zchat-staging.f99.link/api/advertise/attachments'
      })
      return response.data
    }
    catch(error) {
      console.log(error)
    }
  }

  async deleteProduct(id: string) {
    const response = await ApiClient.DELETE(`/product/delete/${id}`)

    return response
  }
}

export default new ProductService()