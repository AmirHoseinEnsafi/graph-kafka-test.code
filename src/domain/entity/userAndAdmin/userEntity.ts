import userAndAdmininterface from './interfaceUserEntity'


class User implements userAndAdmininterface {
    userName: string
    email: string
    password: string | undefined
    isAdmin: boolean
    reservation: string

    constructor (dto : userAndAdmininterface) {
        this.userName = dto.userName 
        this.email   = dto.email
        this.password = dto.password
        this.isAdmin = dto.isAdmin
        this.reservation = dto.reservation
    }
}

export default User;