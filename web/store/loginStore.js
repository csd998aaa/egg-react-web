import { makeAutoObservable } from 'mobx';
import md5 from 'js-md5';

class LoginStore {
    constructor() {
        makeAutoObservable(this)
    }

    loading = false;

    nickname;

    avatar = "https://qiniu.funbfe.com/uPic/logo.png"

    isLogined = false;

    doLogin = async ({ username, password, remember }) => {
        this.loading = true;

        password = md5(password)
        const resp = await window.axios.post('/admin/login', { username, password, remember }).then(res => res.data);
        if (resp.code == 100) {
            this.nickname = resp.data.nickname;
            this.isLogined = true;
            this.setLoginBaseState();
        }
        setTimeout(() => {
            this.loading = false;
        }, 800);
        return resp
    }

    // 缓存登录基础状态
    setLoginBaseState = () => {
        sessionStorage.setItem('login_base_state', JSON.stringify({ nickname: this.nickname }))
    }

    // 获取登录基础状态
    getLoginBaseState = () => {
        let loginBaseState = sessionStorage.getItem("login_base_state") || '{}'
        this.nickname = JSON.parse(loginBaseState).nickname || ''
    }

}

export default new LoginStore();