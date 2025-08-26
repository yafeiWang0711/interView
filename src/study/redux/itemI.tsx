import { useSelector } from 'react-redux';
import type { RootState } from '@store/index';

const Item = () => {
    const count = useSelector((state: RootState) => state.counter.value);
    return (
        <div>
            <h1>Item</h1>
            <p>Count: {count}</p>
        </div>
    )
}
export default Item;
