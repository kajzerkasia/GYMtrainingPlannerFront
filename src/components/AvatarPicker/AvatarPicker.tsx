import classes from './AvatarPicker.module.css';

interface AvatarPickerProps {
    images: Array<{ path: string; caption: string }>;
    selectedImage: string;
    onSelect: (imagePath: string) => void;
}

export default function AvatarPicker({ images, selectedImage, onSelect }: AvatarPickerProps) {
    return (
        <div className={classes.avatar_picker}>
            <p>*Avatar</p>
            <ul>
                {images.map((image: any) => (
                    <li
                        key={image.path}
                        onClick={() => onSelect(image.path)}
                        className={selectedImage === image.path ? `${classes.selected}` : undefined}
                    >
                        <img
                            src={`http://localhost:3001/public/${image.path}`}
                            alt={image.caption}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}