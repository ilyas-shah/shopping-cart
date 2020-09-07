const root = document.querySelector('.root');
const products = JSON.parse(localStorage.getItem('cart'));

const totalItems = document.querySelector('.total__items');
totalItems.textContent = `${products.length} ITEMS`;

/**
 * returns el DOM element
 *
 * @param {string} type type of the DOM element
 * @param {object} props properties of the element
 * @param {array} children children of the element
 */
const createElement = function (type = 'div', props = {}, children = []) {
  const el = document.createElement(type);
  el.textContent = props.text;
  el.setAttribute('class', props.classList || '');

  if (type === 'img') {
    el.src = props.src;
    el.alt = props.alt || 'Image';
  }

  if (type === 'input') {
    el.value = props.value;
    el.type = props.type || 'text';
    el.disabled = props.disable || false;
    el.required = props.required || false;
  }
  if (type === 'a') {
    el.href = props.href;
  }

  if (children.length > 0) {
    children.forEach((child) => el.appendChild(child));
  }
  return el;
};

const createProduct = (product) => {
  const actions = ['EDIT', 'REMOVE', 'SAVE FOR LATER'];

  /* Image container */
  const imgContainer = createElement(
    'div',
    {
      classList: 'img__container',
    },
    [
      createElement('img', {
        classList: 'product__image',
        src: product.p_image,
        alt: product.p_alt,
      }),
    ]
  );

  /* Product Info */
  const productTitle = createElement('p', {
    text:
      (product.p_name + ' ' + product.p_variation).toUpperCase() || 'My Title',
    classList: 'product__title',
  });

  const productStyle = createElement('p', {
    text: `Style #: ${product.p_style.toUpperCase() || ''}`,
    classList: 'product__style',
  });

  const productColor = createElement('p', {
    text: `Colour: ${product.p_selected_color.name}`,
    classList: 'product__color',
  });

  const productSize = createElement('p', {
    text: product.p_selected_size.code.toUpperCase(),
    classList: 'product__size',
  });

  /* Product Quantity */
  const productQty = createElement(
    'p',
    {
      classList: 'product__quantity',
    },
    [
      createElement('input', {
        type: 'number',
        value: product.p_quantity,
        disable: true,
      }),
    ]
  );
  /* Product Quantity */

  /* Product Price */
  const productPrice = createElement(
    'p',
    {
      classList: 'product__cp',
      text: `${product.p_price}`,
    },
    createElement('p', {
      classList: 'product_op',
      text: product.p_originalprice,
    })
  );
  /* Product Price */
  const productInfo = createElement(
    'div',
    {
      classList: 'product__info',
    },
    [
      productTitle,
      productStyle,
      productColor,
      productSize,
      productQty,
      productPrice,
    ]
  );
  /* Product Info */

  /** Product options
   * EDIT, REMOVE, SAVE FOR LATER
   */
  const items = [];
  actions.forEach((action) => {
    let href = '#';

    if (action.toLowerCase() === 'edit') {
      href = `${window.location}/edit/${product.p_id}`;
    }

    const item = createElement(
      'li',
      {
        classList: 'option__item',
      },
      [
        createElement('a', {
          href,
          text: action,
          classList: `product__option--${action.toLowerCase()}`,
        }),
      ]
    );

    items.push(item);
  });

  const options = createElement(
    'ul',
    {
      classList: 'product__options',
    },
    items
  );
  /* Product options */

  const infoContainer = createElement(
    'div',
    {
      classList: 'product__info__container',
    },
    [imgContainer, productInfo]
  );

  // final product
  const productRoot = createElement(
    'div',
    {
      classList: 'product',
    },
    [infoContainer, options]
  );

  return productRoot;
};

const productList = createElement('div', {
  classList: 'product__list',
});

products.forEach((product) => {
  const node = createProduct(product);
  productList.appendChild(node);
});

/* Promo Code card*/
const promoCard = function () {
  const promoHeading = createElement(
    'div',
    {
      classList: 'promo__heading',
    },
    [
      createElement('p', {
        classList: 'promo__heading--md',
        text: 'ENTER PROMOTION CODE OF GIFT CARD',
      }),
    ]
  );
  const promoForm = createElement(
    'form',
    {
      classList: 'card__form',
    },
    [
      createElement('input', {
        classList: 'promo__code__input',
        type: 'text',
        value: '',
        required: true,
      }),
      createElement('input', {
        classList: 'promo__submit',
        type: 'submit',
        value: 'APPLY',
      }),
    ]
  );
  return createElement(
    'div',
    {
      classList: 'promo__card',
    },
    [promoHeading, promoForm]
  );
};

const priceDetails = function (products) {
  let discountPrice = 0;
  let estimatedTotal = 0;
  let subTotal = products
    .map((product) => product.p_price)
    .reduce((acc, item) => (acc += item));
  subTotal = subTotal.toFixed(2);
  const discountPercentage = calculateDiscount(products.length);
  estimatedTotal = subTotal;

  if (discountPercentage) {
    discountPrice = ((discountPercentage / 100) * subTotal).toFixed(2);
    estimatedTotal = (subTotal - discountPrice).toFixed(2);
  }

  return {
    discountPrice,
    subTotal,
    estimatedTotal,
  };
};

const calculateDiscount = function (numberOfItemsInCart) {
  let discount = 0;

  if (numberOfItemsInCart < 3) {
    return false;
  } else if (numberOfItemsInCart === 3) {
    discount = 5;
  } else if (numberOfItemsInCart > 3 && numberOfItemsInCart <= 10) {
    discount = 10;
  } else {
    discount = 25;
  }
  return discount;
};

/* Price Details */
const cartSummary = function () {
  const { subTotal, discountPrice, estimatedTotal } = priceDetails(products);
  const promoCodeValue = document.querySelector('.promo__code__input').value;

  const subTotalElement = createElement(
    'div',
    {
      classList: 'summary',
    },
    [
      createElement('p', { classList: 'summary__label' }, [
        createElement('P', {
          classList: 'summary__label summary__label--md',
          text: 'SUBTOTAL',
        }),
      ]),
      createElement('span', {
        classList: 'summary__value',
        text: `$${subTotal}`,
      }),
    ]
  );
  const estimatedShippingElement = createElement(
    'div',
    {
      classList: 'summary',
    },
    [
      createElement('p', { classList: 'summary__label' }, [
        createElement('p', {
          text: 'ESTIMATED SHIPPING*',
          classList: 'summary__label summary__label--md',
        }),
        createElement('span', {
          classList: 'summary__label summary__label--sm',
          text: 'You qualify for free shipping because your order is over 50*',
        }),
      ]),
      createElement('span', {
        classList: 'summary__value summary__value--md',
        text: `FREE`,
      }),
    ]
  );

  const promoCodeElement = createElement(
    'div',
    {
      classList: 'summary',
    },
    [
      createElement('p', { classList: 'summary__label' }, [
        createElement('P', {
          classList: 'summary__label summary__label-md',
          text: `PROMOTION CODE JF10 APPLIED`,
        }),
      ]),
      createElement('span', {
        classList: 'summary__value',
        text: `-$${discountPrice}`,
      }),
    ]
  );

  return createElement(
    'div',
    {
      classList: 'cart-summary',
    },
    [subTotalElement, estimatedShippingElement, promoCodeElement]
  );
};

const checkout = function () {
  const { estimatedTotal } = priceDetails(products);
  const estimatedTotalElement = createElement(
    'div',
    {
      classList: 'summary',
    },
    [
      createElement('span', { classList: 'summary__label' }, [
        createElement('span', {
          classList: 'summary__label summary__label--large',
          text: 'ESTIMATED TOTAL',
        }),
        // createElement('span', {
        //   classList: 'summary__label summary__label--normal',
        //   text: 'Tax will be applied during checkout.',
        // }),
      ]),

      createElement('span', {
        classList: 'summary__value summary__value--large',
        text: `$${estimatedTotal}`,
      }),
    ]
  );
  return createElement(
    'div',
    {
      classList: 'checkout box--sm',
    },
    [
      estimatedTotalElement,
      createElement('a', {
        classList: 'checkout checkout__btn',
        text: 'CHECKOUT',
      }),
      createElement('a', {
        classList: 'checkout checkout__link',
        text: 'CONTINUE SHOPPING',
      }),
      createElement('span', {
        classList: 'checkout checkout__label',
        text: 'Secure checkout. Shopping is always safe and secure.',
      }),
      createElement('div', { classList: 'checkout checkout__icon' }),
    ]
  );
};

const cartInfo = function () {
  return createElement('div', { classList: 'box--sm' }, [
    createElement('p', { classList: 'cart__info' }, [
      createElement(
        'span',
        { text: 'SIGN IN ', classList: 'cart__info link' },
        [createElement('a', { href: '#' })]
      ),
      createElement('span', {
        text: 'to save your cart and have access to your cart on mobile.',
        classList: 'cart__info label',
      }),
    ]),
  ]);
};

root.appendChild(productList);
root.appendChild(promoCard());
root.appendChild(cartSummary());
root.appendChild(checkout());
root.appendChild(cartInfo());
