import {atom, selector} from 'recoil';

//we define our atom here
export const countAtom = atom({
    key: 'countAtom', //unique key. like a unique name for this atom
    default: 0, //default value for this atom.
})


//DEFINING A SELECTOR
export const evenSelector = selector({
  key: 'count/evenSelector',
  get: ({ get }) => {
    //it gets a function 'get' as argument
    const count = get(countAtom); //we get the atom
    return count % 2; //running the expensive operation
  },
});