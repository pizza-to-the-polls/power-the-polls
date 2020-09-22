import isNullOrEmpty from "./isNullOrEmpty";

const allNullOrEmpty = ( ...args: any[] ) => args.every( x => isNullOrEmpty( x ) );
export default allNullOrEmpty;
