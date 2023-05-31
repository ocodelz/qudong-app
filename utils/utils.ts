const formatTime = (date: Date): string => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = (n: number | string): number | string => {
	n = n.toString()
	return n[1] ? n : '0' + n
}
const toDuration = (val: string): string => {
	var cTime = new Date().getTime();
	var tTime = Date.parse(val as string);
	var diffTime = cTime - tTime;
	if (diffTime < 1000) {
		return "刚刚"
	} else if (diffTime <= 60000) { // (60 * 1000)
		return parseInt((diffTime / 1000).toString()) + "秒前";
	} else if (diffTime <= 3600000) { // (60 * 60 * 1000)
		return parseInt((diffTime / 60000).toString()) + "分钟前"; // (60 * 1000)
	} else if (diffTime <= 86400000) { // (24* 60 * 60 * 1000)
		return parseInt((diffTime / 3600000).toString()) + "时前"; // (60 * 60 * 1000)
	} else if (diffTime <= 2592000000) { // (30 * 24 * 60 * 60 * 1000)
		return parseInt((diffTime / 86400000).toString()) + "天前"; // (24 * 60 * 60 * 1000)
	} else if (diffTime <= 31104000000) { // (12 * 30 * 24 * 60 * 60 * 1000)
		return parseInt((diffTime / 2592000000).toString()) + "月前"; // (30 * 24 * 60 * 60 * 1000)
	} else {
		return parseInt((diffTime / 31104000000).toString()) + "年前"; // (12 * 30 * 24 * 60 * 60 * 1000)
	}
}

export default {
	formatTime,
	formatNumber,
	toDuration
}