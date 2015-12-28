import alt from '../alt';
import AuthActions from '../actions/AuthActions';
import InterceptorUtil from '../utils/InterceptorUtil';
import Config from '../config';
import history from '../history';
import axios from 'axios';
import Uri from 'jsuri';

class AuthStore {
  constructor() {
    this.bindActions(AuthActions);

    // State
    this.accessToken = null;
    this.refreshToken = null;
    this.user = null;
    this.error = null;
  }

  /**
   * Login handler
   * @param credentials
   */
  onLogin(credentials) {
    let config = {headers: {'Access-Control-Allow-Origin': '*'}};
    axios
      .get(this.getAuthEndpoint('token') + '&redirect_uri=http://localhost:3000/', config)
      .then(response => {
        this.saveTokens(response.data);

        return axios.get(Config.apiUrl + '/me', config);
      })
      .then(response => {
        this.loginSuccess(response.data.user);
      })
      .catch(response => {
        this.loginError(response);
      });
  }

  /**
   * Process login success
   * @param user
   */
  loginSuccess(user) {
    localStorage.setItem('user', JSON.stringify(user));

    this.setState({ user: user });
    history.replaceState(null, '/');
  }

  /**
   * Handle login error
   * @param response
   */
  loginError(response) {
    this.setState({ accessToken: null, refreshToken: null, error: response.data.error_description, user: null});
  }

  /**
   * Try to connect user from local storage
   */
  onLocalLogin() {
    let accessToken = localStorage.getItem('access_token');
    let refreshToken = localStorage.getItem('refresh_token');
    let user = JSON.parse(localStorage.getItem('user'));

    if (accessToken && refreshToken && user) {
      this.saveTokens({access_token: accessToken, refresh_token: refreshToken});
      this.loginSuccess(user);
    }
  }

  /**
   * Try to refresh user access token
   */
  onRefreshToken(params) {
    let refreshToken = localStorage.getItem('refresh_token');
    let config = {headers: {'Access-Control-Allow-Origin': '*'}};

    if (refreshToken) {
      axios.interceptors.request.eject(InterceptorUtil.getInterceptor());
      axios
        .get(this.getAuthEndpoint('refresh_token') + '&refresh_token=' + refreshToken, config)
        .then(response => {
          this.saveTokens(response.data);

          // Replay request
          axios(params.initialRequest).then(response => {
            params.resolve(response);
          }).catch(response => {
            params.reject(response);
          });
        })
        .catch(() => {
          this.onLogout();
        });
    }
  }

  /**
   * Logout user
   */
  onLogout() {
    localStorage.clear();

    this.setState({ accessToken: null, refreshToken: null, error: null});

    axios.interceptors.request.eject(InterceptorUtil.getInterceptor());

    history.replaceState(null, '/login');
  }

  /**
   * Save tokens in local storage and automatically add token within request
   * @param params
   */
  saveTokens(params) {
    const {access_token, refresh_token} = params;

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    this.setState({ accessToken: access_token, refreshToken: refresh_token, error: null});

    // Automatically add access token
    var interceptor = axios.interceptors.request.use((config) => {
      config.url = new Uri(config.url).addQueryParam('access_token', access_token);
      return config;
    });

    InterceptorUtil.setInterceptor(interceptor)
  }

  /**
   * Return API endpoint with given grant type (default password)
   * @param grantType
   * @returns {string}
   */
  getAuthEndpoint(grantType='password') {
    return Config.apiUrl + '/oauth/authorize?client_id=' + Config.clientId + '&response_type=' + grantType;
  }
}

export default alt.createStore(AuthStore, 'AuthStore');
