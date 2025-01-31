import {writable} from "svelte/store";

const createNotifier = ()=>{
    const {subscribe, set} = writable({type: "", message: ""});

    return {
        subscribe,
        show: (type, message)=>{
            set({
                type: type,
                message: message
            });

            setTimeout(()=>{
                set({
                    type: type,
                    message: message
                });
            }, 7500);
        }
    }
}


export const user = writable();
export const showLoader = writable(false);
export const notifier = writable({type: "", message: ""});

export const notify = (type, message)=>{
    notifier.type = type;
    notifier.message = message;

    setTimeout(()=>{
        notifier.type = "";
    }, 7500);
}
