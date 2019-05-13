const recognition = async (parm) => {
    return await fetch(`/recognition/face`,
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(parm)//参数是json格式
        }).then(response => response.json())
    //123
}
export default {
    recognition
}