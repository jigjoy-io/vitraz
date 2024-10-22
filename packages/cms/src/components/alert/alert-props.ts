export enum AlertType{
    INFO = 'info',
    SUCCESS = 'success',
    DANGER = 'danger'
}

export default interface AlertProps {
    type: AlertType
    message?: string
    title?: string
}