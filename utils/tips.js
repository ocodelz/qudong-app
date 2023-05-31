const toast = str => {
	return new Promise((resolve, reject) => {
		uni.showToast({
			title: str,
			icon: "none",
			duration: 2000,
			success: () => {
				setTimeout(() => {
					resolve
				}, 2000)
			}
		})
	})
};
const successToast = str => {
	return new Promise((resolve, reject) => {
		uni.showToast({
			title: str,
			icon: "success",
			duration: 2000,
			success: () => {
				setTimeout(() => {
					resolve()
				}, 2000)
			}
		})
	})
};
const showLoading = () => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			success: () => {
				resolve()
			}
		})
	})
};
const tipLoading = str => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: str,
			success: () => {
				resolve()
			}
		})
	})
};
const hideLoading = () => {
	return new Promise((resolve, reject) => {
		uni.hideLoading({
			success: () => {
				resolve()
			}
		})
	})
};
const showCancel = (title, content) => {
	return new Promise((resolve, reject) => {
		uni.showModal({
			title: title,
			content: content,
			showCancel: true,
			confirmColor: '#FF9500',
			success: res => {
				if (res.confirm) {
					resolve();
				} else {
					reject();
				}
			}
		})
	})
};
const hideCancel = (title, content) => {
	return new Promise((resolve, reject) => {
		uni.showModal({
			title: title,
			content: content,
			showCancel: false,
			confirmColor: '#FF9500',
			success: res => {
				if (res.confirm) {
					resolve();
				}
			}
		})
	})
};
export default {
	toast,
	successToast,
	showLoading,
	tipLoading,
	hideLoading,
	showCancel,
	hideCancel
}
