import {atom} from 'recoil';

//we define our atom here
export const countAtom = atom({
    key: 'countAtom', //unique key. like a unique name for this atom
    default: 0, //default value for this atom.
})