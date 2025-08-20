import { Entity,PrimaryGeneratedColumn,Column, OneToMany} from "typeorm";
import { Product } from "./Product";

@Entity('category')
export class Category{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({length : 100, nullable: false})
    name:string;



    @OneToMany(() => Product,product => product.category)
    product:Product[];
}