export default function SidebarMenu(props) {
  return (
    <div className="sidebarMenu">
      <h3 className="sidebarTitle">{props.title}</h3>

      <ul className="sidebarList">
        {props.listMenu.map((item, index) => {
          const { ListIcon, text } = item;
          return (
            <li key={index} className="sidebarListItem">
              <ListIcon className="sidebarIcon" />
              {text}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
