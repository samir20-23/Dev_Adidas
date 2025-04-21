<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Product;
class ProductSeeder extends Seeder
{
    public function run(): void
    {


        $productsJson = '{
            "nike-react-infinity-run-flyknit": {
              "name": "Nike React Infinity Run Flyknit",
              "description":"Designed for active kids and casual explorers, offering durability and a bold look.",
              "brand": "NIKE",
              "gender": "MEN",
              "category": "RUNNING",
              "price": 160,
              "is_in_inventory": true,
              "items_left": 3,
              "is_popular" : true,
              "image": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/react-infinity-run-flyknit-mens-running-shoe-zX42Nc.jpg"
            },
            "nike-react-miler": {
              "name": "Nike React Miler",
              "description":"Designed for active kids and casual explorers, offering durability and a bold look.",
              "brand": "NIKE",
              "gender": "MEN",
              "category": "RUNNING",
              "price": 130,
              "is_in_inventory": true,
              "items_left": 3,
              "is_popular" : true,
              "image": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-5cc7de3b-2afc-49c2-a1e4-0508997d09e6/react-miler-mens-running-shoe-DgF6nr.jpg"
            },
            "nike-air-zoom-pegasus-37": {
              "name": "Nike Air Zoom Pegasus 37",
              "description":"Designed for active kids and casual explorers, offering durability and a bold look.",
              "brand": "NIKE",
              "gender": "WOMEN",
              "category": "RUNNING",
              "price": 120,
              "is_in_inventory": true,
              "items_left": 3,
              "is_popular" : true,
              "image": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-33b0a0a5-c171-46cc-ad20-04a768703e47/air-zoom-pegasus-37-womens-running-shoe-Jl0bDf.jpg"
            },
            "nike-joyride-run-flyknit": {
              "name": "Nike Joyride Run Flyknit",
              "description":"Designed for active kids and casual explorers, offering durability and a bold look.",
              "brand": "NIKE",
              "gender": "WOMEN",
              "category": "RUNNING",
              "price": 180,
              "is_in_inventory": true,
              "items_left": 3,
              "is_popular" : true,
              "image": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/99a7d3cb-e40c-4474-91c2-0f2e6d231fd2/joyride-run-flyknit-womens-running-shoe-HcfnJd.jpg"
            },
            "nike-mercurial-vapor-13-elite-fg": {
              "name": "Nike Mercurial Vapor 13 Elite FG",
              "description":"Designed for active kids and casual explorers, offering durability and a bold look.",
              "brand": "NIKE",
              "gender": "WOMEN",
              "category": "FOOTBALL",
              "price": 250,
              "is_in_inventory": true,
              "items_left": 3,
              "is_popular" : true,
              "image": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/9dda6202-e2ff-4711-9a09-0fcb7d90c164/mercurial-vapor-13-elite-fg-firm-ground-soccer-cleat-14MsF2.jpg"
            },
            "nike-phantom-vision-elite-dynamic-fit-fg": {
              "name": "Nike Phantom Vision Elite Dynamic Fit FG",
              "description":"A timeless classic reimagined with modern flair for everyday wear.",
              "brand": "NIKE",
              "gender": "WOMEN",
              "category": "FOOTBALL",
              "price": 150,
              "is_in_inventory": true,
              "items_left": 3,
              "is_popular" : false,
              "image": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/s1amp7uosrn0nqpsxeue/phantom-vision-elite-dynamic-fit-fg-firm-ground-soccer-cleat-19Kv1V.jpg"
            },
            "nike-phantom-venom-academy-fg": {
              "name": "Nike Phantom Venom Academy FG",
              "description":"A timeless classic reimagined with modern flair for everyday wear.",
              "brand": "NIKE",
              "gender": "WOMEN",
              "category": "FOOTBALL",
              "price": 80,
              "is_in_inventory": true,
              "items_left": 3,
              "is_popular" : false,
              "image": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/whegph8z9ornhxklc8rp/phantom-venom-academy-fg-firm-ground-soccer-cleat-6JVNll.jpg"
            },
            "nike-mercurial-vapor-13-elite-tech-craft-fg": {
              "name": "Nike Mercurial Vapor 13 Elite Tech Craft FG",
              "description":"A timeless classic reimagined with modern flair for everyday wear.",
              "brand": "NIKE",
              "gender": "MEN",
              "category": "FOOTBALL",
              "price": 145,
              "is_in_inventory": true,
              "items_left": 3,
              "is_popular" : false,
              "image": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/vhbwnkor8sxt8qtecgia/mercurial-vapor-13-elite-tech-craft-fg-firm-ground-soccer-cleat-l38JPj.jpg"
            },
            "nike-mercurial-superfly-7-pro-mds-fg": {
              "name": "Nike Mercurial Superfly 7 Pro MDS FG",
              "description":"A timeless classic reimagined with modern flair for everyday wear.",
              "brand": "NIKE",
              "gender": "MEN",
              "category": "FOOTBALL",
              "price": 137,
              "is_in_inventory": true,
              "items_left": 3,
              "is_popular" : false,
              "image": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-a52a8aec-22dc-4982-961b-75c5f4c72805/mercurial-superfly-7-pro-mds-fg-firm-ground-soccer-cleat-mhcpdN.jpg"
            },
            "nike-air-force-1": {
              "name": "Nike Air Force 1",
              "description":"A timeless classic reimagined with modern flair for everyday wear.",
              "brand": "NIKE",
              "gender": "KIDS",
              "category": "CASUAL",
              "price": 90,
              "is_in_inventory": true,
              "items_left": 3,
              "is_popular" : false,
              "image": "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/178b2a46-3ee4-492b-882e-f71efdd53a36/air-force-1-big-kids-shoe-2zqp8D.jpg"
            },
            "nike-air-max-90": {
              "name": "Nike Air Max 90",
              "description":"A timeless classic reimagined with modern flair for everyday wear.",
              "brand": "NIKE",
              "gender": "KIDS",
              "category": "CASUAL",
              "price": 100,
              "is_in_inventory": true,
              "items_left": 3,
              "is_popular" : false,
              "image": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8439f823-86cf-4086-81d2-4f9ff9a66866/air-max-90-big-kids-shoe-1wzwJM.jpg"
            },
            "nike-air-max-90-ltr": {
              "name": "Nike Air Max 90 LTR",
              "description":"A timeless classic reimagined with modern flair for everyday wear.",
              "brand": "NIKE",
              "gender": "KIDS",
              "category": "CASUAL",
              "price": 110,
              "is_in_inventory": true,
              "items_left": 3,
              "is_popular" : false,
              "image": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-620aeb37-1b28-44b0-9b14-5572f8cbc948/air-max-90-ltr-big-kids-shoe-hdNLQ5.jpg"
            },
            "nike-joyride-dual-run": {
              "name": "Nike Joyride Dual Run", 
              "description":"A perfect blend of style and comfort, crafted to keep your feet happy all day long.",
              "brand": "NIKE",
              "gender": "KIDS",
              "category": "RUNNING",
              "price": 110,
              "is_in_inventory": false,
              "items_left": 3,
              "is_popular" : false,
              "image": "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/33888130-0320-41a1-ba53-a026decd8aa2/joyride-dual-run-big-kids-running-shoe-1HDJF8.jpg"
            },
            "nike-renew-run": {
              "name": "Nike Renew Run",
              "description":"A perfect blend of style and comfort, crafted to keep your feet happy all day long.",
              "brand": "NIKE",
              "gender": "KIDS",
              "category": "RUNNING",
              "price": 80,
              "is_in_inventory": true,
              "items_left": 3,
              "is_popular" : false,
              "image": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-73e54c0b-11a6-478b-9f90-bd97fcde872d/renew-run-big-kids-running-shoe-5Bpz93.jpg"
            }, 

            "ss-pm-0093": {
              "name": "SS-PM-0093",
              "description":"A perfect blend of style and comfort, crafted to keep your feet happy all day long.",
              "brand": "HUSHPUPPIES",
              "gender": "WOMEN",
              "category": "CASUAL",
              "price": 30,
              "is_in_inventory": true,
              "items_left": 3,
              "is_popular" : false,
              "image": "https://cdn.shopify.com/s/files/1/0016/0074/9623/products/SS-PM-0093_1_800x800.jpg?v=1570601253"
            },
            "nizza-x-disney": {
              "name": "Nizza X Disney",
              "description":"A perfect blend of style and comfort, crafted to keep your feet happy all day long.",
              "brand": "ADIDAS",
              "gender": "KIDS",
              "category": "CASUAL",
              "price": 55,
              "is_in_inventory": true,
              "items_left": 6,
              "is_popular" : false,
              "image": "https://assets.adidas.com/images/h_320,f_auto,q_auto:sensitive,fl_lossy/ef901c7aeac042578eceab9d0159196c_9366/Nizza_x_Disney_Sport_Goofy_Shoes_White_FW0651_01_standard.jpg"
            },
            "x_plr": {
              "name": "X_PLR",
              "description":"A perfect blend of style and comfort, crafted to keep your feet happy all day long.",
              "brand": "ADIDAS",
              "gender": "KIDS",
              "category": "CASUAL",
              "price": 65,
              "is_in_inventory": true,
              "items_left": 5,
              "is_popular" : false,
              "image": "https://assets.adidas.com/images/h_320,f_auto,q_auto:sensitive,fl_lossy/a36518227134495da766ab9d01772fa2_9366/X_PLR_Shoes_Red_FY9063_01_standard.jpg"
            },
            "stan-smith": {
              "name": "Stan Smith",
              "description":"A perfect blend of style and comfort, crafted to keep your feet happy all day long.",
              "brand": "ADIDAS",
              "gender": "KIDS",
              "category": "CASUAL",
              "price": 55,
              "is_in_inventory": true,
              "items_left": 3,
              "is_popular" : false,
              "image": "https://assets.adidas.com/images/h_320,f_auto,q_auto:sensitive,fl_lossy/d0720712d81e42b1b30fa80800826447_9366/Stan_Smith_Shoes_White_M20607_M20607_01_standard.jpg"
            },
            "nmd_r1": {
              "name": "NMD_R1",
              "description":"A perfect blend of style and comfort, crafted to keep your feet happy all day long.",
              "brand": "ADIDAS",
              "gender": "KIDS",
              "category": "RUNNING",
              "price": 120,
              "is_in_inventory": true,
              "items_left": 3,
              "is_popular" : false,
              "image": "https://assets.adidas.com/images/h_320,f_auto,q_auto:sensitive,fl_lossy/99ca762cb9054caf82fbabc500fd146e_9366/NMD_R1_Shoes_Blue_FY9392_01_standard.jpg"
            },
            "nmd_r1-flash-red": {
              "name": "NMD_R1 Flash Red",
              "description":"A perfect blend of style and comfort, crafted to keep your feet happy all day long.",
              "brand": "ADIDAS",
              "gender": "WOMEN",
              "category": "CASUAL",
              "price": 140,
              "is_in_inventory": true,
              "items_left": 5,
              "is_popular" : false,
              "image": "https://assets.adidas.com/images/h_320,f_auto,q_auto:sensitive,fl_lossy/90f85768e3894aeaab67aba0014a3379_9366/NMD_R1_Shoes_Red_FY9389_01_standard.jpg"
            },
            "superstar": {
              "name": "Superstar",
              "description":"A perfect blend of style and comfort, crafted to keep your feet happy all day long.",
              "brand": "ADIDAS",
              "gender": "WOMEN",
              "category": "CASUAL",
              "price": 90,
              "is_in_inventory": true,
              "items_left": 3,
              "is_popular" : false,
              "image": "https://assets.adidas.com/images/h_320,f_auto,q_auto:sensitive,fl_lossy/12365dbc7c424288b7cdab4900dc7099_9366/Superstar_Shoes_White_FW3553_FW3553_01_standard.jpg"
            }
        }';

        $productsData = json_decode($productsJson, true);

        foreach ($productsData as $key => $product) {
            $products[] = [
                'name' => $product['name'],
                'description' => $product['description'],
                'price' => $product['price'],
                'image' => $product['image'],
                'category' => $product['category'],
            ];
        }

        DB::table('products')->insert($products);
    }
}
