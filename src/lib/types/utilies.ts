export interface Payload<T> {
	errors?: Record<string, any>[]
	data: T
}