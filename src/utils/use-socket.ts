import { ref, onMounted } from 'vue';

/**
 * 连接状态
 */
enum READY_STATUS {
    '连接尚未建立' = 0,
    '连接已建立，可以进行通信' = 1,
    '连接正在进行关闭' = 2,
    '连接已经关闭或者连接不能打开' = 3,
}

/**
 * @description use websocket
 * @param handleReceive 服务端信息的处理方法
 */
export default function useWebSocket(
    url: string,
    openCallback: () => void,
    messageCallback: (data: any) => void,
    closeCallback: () => void,
) {
    /**
     * websocket 实例
     */
    const ws = ref();

    /**
     * 初始化 websocket
     */
    function initWebSocket() {
        if ('WebSocket' in window) {
            // 创建 websocket 实例
            ws.value = new WebSocket(url);

            ws.value.onopen = onopen;
            ws.value.onmessage = onmessage;
            ws.value.onclose = onclose;
            ws.value.onerror = () => onerror;
        } else {
            alert('您的浏览器不支持 webSocket');
        }
    }

    /**
     * 连接建立时触发
     */
    function onopen() {
        // 开启心跳
        // heartCheck.start();
        console.log('onopen');
        openCallback();
    }

    /**
     * 客户端接收服务端数据时触发
     */
    function onmessage(event: any) {
        const res = JSON.parse(event.data);

        // 收到服务端心跳，则重置心跳
        // if (res.type === 'heartbeat') {
        //     heartCheck.reset();
        // } else {
        //     messageCallback(res);
        // }

        messageCallback(res);
    }

    /**
     * 连接关闭时触发
     */
    function onclose() {
        console.log('onclose');
        closeCallback();
    }

    /**
     * 连接发生错误时触发
     */
    function onerror() {
        console.log('onerror');
        reconnect();
    }

    /**
     * 重新连接
     */
    let timer: any = null;
    const timeout = 5 * 1000;

    function reconnect() {
        // WebSocket.OPEN <==> READY_STATUS['连接已建立，可以进行通信']
        if (ws.value.readyState === READY_STATUS['连接已建立，可以进行通信']) {
            return;
        }

        // 没连上会一直重连，设置延时避免请求过多
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            initWebSocket();
        }, timeout);
    }

    /**
     * 心跳检测（需要服务端配合）
     */
    let heartTimer: any = null;
    let serverTimer: any = null;
    const heartTimeout = 10 * 1000;
    const serverTimeout = 60 * 1000;

    const heartCheck = {
        // 重置心跳
        reset: function () {
            clearTimeout(heartTimer);
            clearTimeout(serverTimer);
            heartTimer = null;
            serverTimer = null;
        },

        // 开启心跳
        start: function () {
            heartTimer && clearTimeout(heartTimer);
            serverTimer && clearTimeout(serverTimer);

            heartTimer = setTimeout(() => {
                // 连接正常时
                if (ws.value.readyState === READY_STATUS['连接已建立，可以进行通信']) {
                    // 定时向服务端发送心跳，服务端收到后返回一个心跳，可在 onmessage 事件中重置心跳
                    ws.value.send('heartbeat');
                } else {
                    // 否则重新连接
                    reconnect();
                }

                // 超时关闭 websocket
                serverTimer = setTimeout(() => {
                    ws.value.close();
                }, serverTimeout);
            }, heartTimeout);
        },
    };

    /**
     * 页面挂载
     */
    onMounted(() => {
        initWebSocket();
    });

    /**
     * 监听窗口关闭事件
     * 当窗口关闭时，主动去关闭 websocket 连接，防止连接还没断开就关闭窗口，服务端会抛异常
     */
    window.onbeforeunload = () => {
        ws.value.close();
    };

    return {
        ws,
    };
}
