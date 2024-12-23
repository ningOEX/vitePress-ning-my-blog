// docs/utils/api.js
export async function request(url) {
    try {
        const response = await fetch(url); // 请求 JSON 文件
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json(); // 返回解析后的 JSON
    } catch (error) {
        console.error('Fetch Error:', error);
        throw error; // 抛出错误以便进一步处理
    }
}