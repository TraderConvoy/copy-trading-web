export const HandleErrorInterceptor = async (response) => {
  if (response && response.status === 403) {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace(`/copy-trading/login`);
    setTimeout(() => {
      // message.error('');
      alert('Your session expiration!');
    }, 1000);
  }
};
