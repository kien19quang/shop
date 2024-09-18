import ApiClient from "@/configs/axiosConfig"
import { LoginUserDto, RegisterUserDto } from "@/models/user/UserModel"

class UserService {
  async login(data: LoginUserDto) {
    const response = await ApiClient.POST('/user/login', data)

    return response
  }

  async getListAdmin() {
    const response = await ApiClient.GET(`/user/admin/get_list`)

    return response
  }

  async createUser(data: RegisterUserDto) {
    const response = await ApiClient.POST('/user/create_user', data)

    return response
  }

  async updateUser(id: string, data: RegisterUserDto) {
    const response = await ApiClient.PUT(`/user/update/${id}`, data)

    return response
  }

  async deleteUser(id: string) {
    const response = await ApiClient.DELETE(`/user/delete/${id}`)

    return response
  }
}

export default new UserService()