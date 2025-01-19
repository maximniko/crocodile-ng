import {Word} from '../words/word.interface';

export interface Category {
  title: string
  words: Word[]
}

export interface CompactCategory {
  title: string
  words: string[][]
}
