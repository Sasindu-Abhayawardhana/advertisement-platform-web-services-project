import {AdRepository} from "../ad.repository.js";
import {PoolClient} from "pg";
import {AdEntity} from "../../../entity/ad.entity.js";

export class AdRepositoryImpl implements AdRepository{
    constructor(private connection: PoolClient) {
    }

    async count(): Promise<number> {
        const {rowCount} = await this.connection.query('SELECT * FROM ad');
        return rowCount!;
    }

    async save(ad: AdEntity): Promise<number> {
        const {rows} = await this.connection.query('INSERT INTO ad (title, description, posted_date, user_email) VALUES ($1, $2, $3, $4)',
            [ad.title, ad.description, ad.postedDate, ad.userEmail]);
        ad = rows[0];
        return ad.id;
    }

    async update(ad: AdEntity): Promise<void> {
        await this.connection.query('UPDATE "ad" SET title=$1, description=$2, posted_date=$3, user_email=$4 WHERE id=$5',
            [ad.title, ad.description, ad.postedDate, ad.userEmail, ad.id]);
    }

    async deleteById(adId: number): Promise<void> {
        await this.connection.query('DELETE FROM "ad" WHERE id = $1', [adId]);
    }

    async findById(adId: number): Promise<AdEntity> {
        const {rows: [ad]} = await this.connection.query('SELECT * FROM "ad" WHERE id = $1',
            [adId]);
        return ad;
    }

    async findAll(): Promise<AdEntity[]> {
        const {rows} = await this.connection.query('SELECT * FROM "ad"');
        return rows;
    }

    async existsById(adId: number): Promise<boolean> {
        return (!!(await this.findById(adId)));
    }
}