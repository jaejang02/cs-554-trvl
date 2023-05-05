import {v4 as uuid} from 'uuid';
const initalState = [
  {
    id: uuid(),
    name: 'Username',
    selected: true,
    collections: []
  }
];

let copyState = null;
let index = 0;

const marvelReducer = (state = initalState, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'ADD_COLLECTOR':
      console.log('payload', payload);
      return [
        ...state, {
          id: uuid(),
          name: payload.name,
          selected: false,
          collections: []

        }
      ];
    case 'SELECT_COLLECTOR':
      console.log('payload', payload);
      const updatedState = state.map(collector => ({
        ...collector,
        selected: collector.id === payload.id
      }));
      console.log(updatedState);
      return updatedState;

      case 'DELETE_COLLECTOR':
        console.log('payload', payload);
        let copyState1 = [...state];
        index = copyState1.findIndex((x) => x.id === payload.id);
        copyState1.splice(index, 1);
        return [...copyState1];


    case 'COLLECT_CHARACTER':
      const copyState = [...state];
      console.log('payload', payload);
      console.log("REDUCERS COLLECTING CHARACTER")
    //  can not collect more than 10
    const collectorId = payload.collectorid.id;
    const collectorIndex = state.findIndex(collector => collector.id === collectorId);
    if (collectorIndex === -1) {
      return state; // Collector not found, return the original state
    }
    const collector = state[collectorIndex];
    console.log("Before collections")
    if (collector.collections){
      if ( collector.collections && collector.collections.length >= 10) {
        return state; // Can't collect more than 10 characters, return the original state
      }
    }
    console.log("Confirm");
    
    const updatedCollector = {
      ...collector,
      collections: [...collector.collections, payload.character]
    };
    return [
      ...state.slice(0, collectorIndex),
      updatedCollector,
      ...state.slice(collectorIndex + 1)
    ];
    case 'GIVE_UP_CHARACTER':
  const giveUpState = [...state];
  const collectorIndexG = giveUpState.findIndex(collector => collector.id === payload.collectorid.id);
  if (collectorIndexG === -1) {
    return state;
  }
  const collectorG = giveUpState[collectorIndexG];
  const updatedCollectionsG = collectorG.collections.filter(character => character.id !== payload.character.id);
  const updatedCollectorG = {
    ...collectorG,
    collections: updatedCollectionsG,
  };
  giveUpState.splice(collectorIndexG, 1, updatedCollectorG);
  return giveUpState;
    default:
      return state;
  }
};

export default marvelReducer;