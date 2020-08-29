export const useSubject = (subject: any, callback: any) => {
	const subscription = subject.subscribe(callback);
	return () => subscription.unsubscribe();
}
