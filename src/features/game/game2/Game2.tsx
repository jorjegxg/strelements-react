
import { useCharacterMovement } from "./CharacterMovement";
import { CharacterList } from "./CharactersList";
import { MyComponent } from "./MyComponent";
import { useSocketListener } from "./soket";

export default function Game2() {
    useSocketListener();
    useCharacterMovement();

 return (
    <div>
      <MyComponent/>
      <CharacterList />
    </div>
  );
}
    
