import { Entity,PrimaryGeneratedColumn,Column,ManyToOne } from "typeorm";
import { Category } from "./Category";

@Entity('product')
export class Product{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type :"varchar", length:100, nullable: false})
    name:string

    @Column({type:"int", nullable:false})
    price:number;

    @ManyToOne(()=> Category,category => category.product)
    category:Category;
}