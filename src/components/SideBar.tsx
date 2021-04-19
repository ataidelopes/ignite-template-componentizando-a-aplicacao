import { useEffect, useState } from 'react';
import { GenreResponseProps } from '../models/GenreResponseProps';
import { api } from '../services/api';
import { Button } from './Button';
interface IPropsSideBar {
  onClickButton(id: number): void;
  selectedGenreId: number;
}

export function SideBar({ onClickButton, selectedGenreId }: IPropsSideBar) {

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

 return(
  <nav className="sidebar">
    <span>Watch<p>Me</p></span>

    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          key={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => onClickButton(genre.id)}
          selected={selectedGenreId === genre.id}
        />
      ))}
    </div>

  </nav>
 );
}