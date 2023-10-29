"use strict"

const popingElements = document.querySelectorAll('[poping]');
popingElements.forEach(popingElement =>{
        popingElement.addEventListener("mouseover", function(){ popElement(popingElement);});
        popingElement.addEventListener("mouseout", function(){ unpopElement(popingElement);});
});


const menuLinksWrappers = document.querySelectorAll('[data-line-effect]');
var effectTransition = ``;
const effectHover = `transform: translate3d(0px, 0px, 0px);`;
const effectLeft = `transform: translate3d(-100%, 0px, 0px);`;
const effectRight = `transform: translate3d(100%, 0px, 0px);`;

menuLinksWrappers.length ? menuEffect() : null;

function popElement(popingElement){
    popingElement.style.transform = `scale(1.5)`;
    //popingElement.style.width = "200px";
}

function unpopElement(popingElement){
    popingElement.style.transform = `scale(1)`;
}

//console.info(menuLinksWrappers);

function menuEffect()
{
    //console.info("starting effect");
    menuLinksWrappers.forEach(menuLinksWrapper =>{
        const menuLinks = menuLinksWrapper.querySelectorAll('a');
        //console.info(menuLinks);
        const effectSpeed = menuLinksWrapper.dataset.lineEffect? menuLinksWrapper.dataset.lineEffect : 200;
        menuLinks.length? menuEffectItem(menuLinks, effectSpeed) : null;
    })
}

function menuEffectItem(menuLinks, effectSpeed)
{
    effectTransition = `transition: transform ${effectSpeed}ms ease;`;

    menuLinks.forEach(menuLink =>{
        menuLink.insertAdjacentHTML(`beforeend`,`
        <span style = "${effectRight}" class = "hover">
            <span style = "${effectLeft}" class = "hover_text">${menuLink.textContent}</span>
        </span>
        `);

        menuLink.onmouseenter = menuLink.onmouseleave = menuLinkActions;
    })
}

function menuLinkActions(e)
{
    const menuLink = e.target;
    const menuLinkItem = menuLink.querySelector('.hover');
    const menuLinkText = menuLink.querySelector('.hover_text');
    const menuLinkWidth = menuLink.offsetWidth / 2;
    const menuLinkPos = e.pageX - (menuLink.getBoundingClientRect().left + scrollX)

    if(e.type === "mouseenter")
    {
        menuLinkItem.style.cssText = menuLinkPos > menuLinkWidth ? effectRight : effectLeft;
        menuLinkText.style.cssText = menuLinkPos > menuLinkWidth ? effectLeft : effectRight;

        setTimeout(()=>{
            menuLinkItem.style.cssText = effectHover + effectTransition;
            menuLinkText.style.cssText = effectHover + effectTransition;
        },5)
        
    }
    if(e.type === "mouseleave")
    {
        menuLinkItem.style.cssText = menuLinkPos > menuLinkWidth ? effectRight + effectTransition : effectLeft + effectTransition;
        menuLinkText.style.cssText = menuLinkPos > menuLinkWidth ? effectLeft + effectTransition : effectRight + effectTransition;
    }
}
